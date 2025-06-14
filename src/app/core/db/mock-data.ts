import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MOCK_DATA } from './data';

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
    const clients: Client[] = MOCK_DATA;

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
