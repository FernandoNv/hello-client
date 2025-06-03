import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default class MockData implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const clients: Client[] = [
      {
        id: 'f589af1e-f201-4278-a224-7aecec0db191',
        email: 'email@email.com',
        phone: '21 12222-1234',
        name: 'Fernando Vieira',
        address: {
          street: 'Rua Fulano de Tal',
          number: '10',
          zipCode: '20970-007',
          city: 'Rio de Janeiro',
          state: 'Rio de Janeiro',
        },
      },
    ];

    return { clients };
  }

  post(reqInfo: RequestInfo): Observable<unknown> {
    if (reqInfo.collectionName === 'clients') {
      const body = reqInfo.utils.getJsonBody(reqInfo.req);
      body.id = uuidv4();

      const options: ResponseOptions = {
        body,
        status: 201,
        headers: reqInfo.headers,
        url: reqInfo.url,
      };

      reqInfo.collection.push(body);
      return reqInfo.utils.createResponse$(() => options);
    }

    // fallback to default handling
    return undefined as any;
  }
}
