import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../core/db/crud-service';
import { Client } from '../../core/db/mock-data';
import { delay } from 'rxjs';

@Injectable()
export class ClientService implements CrudService<Client> {
  private readonly URL = 'api/clients';
  private readonly http = inject(HttpClient);

  getById(id: string) {
    return this.http.get<Client>(`${this.URL}/${id}`).pipe(delay(500));
  }

  getAll(options?: object) {
    return this.http.get<Client[]>(`${this.URL}/`).pipe(delay(500));
  }

  delete(id: string) {
    return this.http.delete<string>(`${this.URL}/${id}`).pipe(delay(500));
  }

  create(client: Client) {
    return this.http.post<Client>(`${this.URL}/`, client).pipe(delay(500));
  }

  update(id: string, client: Client) {
    return this.http.put<Client>(`${this.URL}/${id}`, client).pipe(delay(500));
  }
}
