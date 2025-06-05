import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../core/db/crud-service';
import { Client } from '../../core/db/mock-data';
import { delay, map } from 'rxjs';

@Injectable()
export class ClientService implements CrudService<Client> {
  private readonly URL = 'api/clients';
  private readonly http = inject(HttpClient);

  getById(id: string) {
    return this.http.get<Client>(`${this.URL}/${id}`).pipe(delay(500));
  }

  getAll(options?: { search: string }) {
    if (!options) {
      return this.http
        .get<Client[]>(`${this.URL}/`)
        .pipe(delay(500))
        .pipe(map(clients => this.sortClients(clients)));
    }

    return this.http
      .get<Client[]>(`${this.URL}/`)
      .pipe(delay(500))
      .pipe(
        map(clients =>
          clients.filter(c =>
            Object.values(c).some(v =>
              String(v).toLowerCase().includes(options.search.toLowerCase().trim()),
            ),
          ),
        ),
        map(clients => this.sortClients(clients)),
      );
  }

  private sortClients(clients: Client[]): Client[] {
    return clients.sort((c1, c2) =>
      c1.name.toLocaleLowerCase().localeCompare(c2.name.toLocaleLowerCase()),
    );
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
