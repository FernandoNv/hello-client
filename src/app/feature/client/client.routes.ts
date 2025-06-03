import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    providers: [],
    children: [
      {
        path: 'list',
        component: ClientListComponent,
      },
    ],
  },
];
