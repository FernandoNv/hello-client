import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientDatasource } from '../client.datasource';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ClientCardComponent } from './client-card/client-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  imports: [ProgressSpinner, ClientCardComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {
  private readonly clientDataSource = inject(ClientDatasource);
  private readonly router = inject(Router);

  protected readonly clients = toSignal(this.clientDataSource.clients$);
  protected readonly isLoading = toSignal(this.clientDataSource.loading$);

  onEdit(id: string) {
    this.router.navigate(['/client/details', id]);
  }

  onDelete(id: string) {
    console.log(id);
  }
}
