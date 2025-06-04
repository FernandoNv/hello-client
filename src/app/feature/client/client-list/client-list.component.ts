import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ClientDatasource } from '../client.datasource';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ClientCardComponent } from './client-card/client-card.component';
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ClientToolbarComponent } from './client-toolbar/client-toolbar.component';

@Component({
  selector: 'app-client-list',
  imports: [
    ProgressSpinner,
    ClientCardComponent,
    IconFieldModule,
    InputIconModule,
    ClientToolbarComponent,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {
  private readonly clientDataSource = inject(ClientDatasource);
  private readonly router = inject(Router);

  protected readonly view = signal<'card' | 'table'>('card');

  protected readonly clients = toSignal(this.clientDataSource.clients$);
  protected readonly isLoading = toSignal(this.clientDataSource.loading$);

  onEdit(id: string): void {
    this.router.navigate(['/client/details', id]);
  }

  onDelete(id: string): void {
    console.log(id);
  }

  goToNewClientPage(): void {
    debugger;
    this.router.navigate(['/client/create']);
  }

  onSearchValueChange(search: string): void {
    console.log(search);
  }
}
