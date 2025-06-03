import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client.component';

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
    ],
  },
];
