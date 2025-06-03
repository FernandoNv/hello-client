import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client.component';
import { ClientCreateComponent } from './client-create/client-create.component';

export const routes: Routes = [
  {
    path: '',
    providers: [],
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
    ],
  },
];
