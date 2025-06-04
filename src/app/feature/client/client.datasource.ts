import { inject, Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { BehaviorSubject, catchError, finalize, map, Observable, of, retry, take } from 'rxjs';
import { Client } from '../../core/db/mock-data';

@Injectable()
export class ClientDatasource {
  private readonly clientService = inject(ClientService);
  private readonly clientSubject = new BehaviorSubject<Client[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly crudLoadingSubject = new BehaviorSubject<boolean>(false);

  public clients$ = this.clientSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public crudLoading$ = this.crudLoadingSubject.asObservable();

  constructor() {
    this.loadClients();
  }

  loadClients(): void {
    this.loadingSubject.next(true);
    this.clientService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false)),
        catchError(error => {
          console.error(error);
          return of([]);
        }),
      )
      .subscribe(client => this.clientSubject.next(client));
  }

  getById(id: string): Observable<Client | null> {
    this.crudLoadingSubject.next(true);
    return this.clientService.getById(id).pipe(
      retry(3),
      take(1),
      finalize(() => {
        this.crudLoadingSubject.next(false);
      }),
      catchError(error => {
        console.error(error);
        this.crudLoadingSubject.next(false);

        return of(null);
      }),
    );
  }

  create(client: Client): Observable<Client | null> {
    this.crudLoadingSubject.next(true);
    return this.clientService.create(client).pipe(
      retry(3),
      take(1),
      finalize(() => {
        this.crudLoadingSubject.next(false);
        this.loadClients();
      }),
      catchError(error => {
        console.error(error);
        this.crudLoadingSubject.next(false);

        return of(null);
      }),
    );
  }

  update(id: string, client: Client): Observable<Client | null> {
    return this.clientService.update(id, client).pipe(
      retry(3),
      take(1),
      map(next => (next ? next : client)),
      finalize(() => {
        this.loadClients();
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      }),
    );
  }

  delete(id: string): Observable<string | null> {
    this.crudLoadingSubject.next(true);
    return this.clientService.delete(id).pipe(
      retry(3),
      take(1),
      map(next => (next ? next : id)),
      finalize(() => {
        this.crudLoadingSubject.next(false);
        this.loadClients();
      }),
      catchError(error => {
        this.crudLoadingSubject.next(false);
        console.error(error);

        return of(null);
      }),
    );
  }

  reset(): void {
    this.clientSubject.next([]);
  }
}
