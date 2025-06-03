export interface CrudService<T> {
  getById(id: string): Observable<T>;
  getAll(options?: object): Observable<T[]>;
  delete(id: string): Observable<void>;
  create(data: T): Observable<T>;
  update(id: string, data: T): Observable<T>;
}
