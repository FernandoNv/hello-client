import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientDatasource } from './client.datasource';
import { ClientService } from './client.service';
import { ClientEditComponent } from './client-edit/client-edit.component';

export const routes: Routes = [
  {
    path: '',
    providers: [ClientDatasource, ClientService],
    component: ClientComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ClientListComponent,
      },
      {
        path: 'create',
        component: ClientCreateComponent,
      },
      {
        path: 'details/:id',
        component: ClientEditComponent,
      },
    ],
  },
];
