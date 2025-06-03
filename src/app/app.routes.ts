import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    component: MainLayoutComponent,
    loadChildren: () => import('./feature/client/client.routes').then(m => m.routes),
  },
];
