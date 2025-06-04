import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ClientDatasource } from '../client.datasource';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ClientCardComponent } from './client-card/client-card.component';
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ClientToolbarComponent } from './client-toolbar/client-toolbar.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../../../core/db/mock-data';

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
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  protected readonly view = signal<'card' | 'table'>('card');

  protected readonly clients = toSignal(this.clientDataSource.clients$);
  protected readonly isLoading = toSignal(this.clientDataSource.loading$);

  onEdit(id: string): void {
    this.router.navigate(['/client/details', id]);
  }

  onDelete(id: string, client: Client): void {
    debugger;
    this.confirmationService.confirm({
      message: `
          Are you sure that you want to delete this client? </br>
          <b>Name:</b> ${client.name}</br>
          <b>email:</b> ${client.email}
      `,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.clientDataSource.delete(id).subscribe(next => {
          if (next) {
            this.messageService.add({
              severity: 'success',
              summary: 'Confirmed',
              detail: 'Client deleted!',
            });
            return;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error deleting the client',
            detail: 'Something went wrong!',
          });
        });
      },
    });
  }

  goToNewClientPage(): void {
    debugger;
    this.router.navigate(['/client/create']);
  }

  onSearchValueChange(search: string): void {
    console.log(search);
  }
}
