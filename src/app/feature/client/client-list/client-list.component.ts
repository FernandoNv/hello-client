import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ClientDatasource } from '../client.datasource';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ClientToolbarComponent } from './client-toolbar/client-toolbar.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientTableComponent } from './client-table/client-table.component';
import { ClientCardListComponent } from './client-card-list/client-card-list.component';
import { TranslatedValuesService } from '../../../core/translated-values/translated-values.service';

@Component({
  selector: 'app-client-list',
  imports: [
    ProgressSpinner,
    IconFieldModule,
    InputIconModule,
    ClientToolbarComponent,
    ClientTableComponent,
    ClientCardListComponent,
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

  private readonly translate = inject(TranslatedValuesService);
  private readonly translatedTextPage = this.translate.translatedTextPage;

  private readonly MESSAGE_SUCCESS = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['MESSAGE_CLIENT_DELETE_SUCCESS'] : '',
  );
  private readonly MESSAGE_SUMMARY_SUCCESS = computed(() =>
    this.translatedTextPage()
      ? this.translatedTextPage()!['MESSAGE_SUMMARY_CLIENT_DELETE_SUCCESS']
      : '',
  );
  private readonly MESSAGE_ERROR = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['MESSAGE_CLIENT_DELETE_ERROR'] : '',
  );
  private readonly MESSAGE_SUMMARY_ERROR = computed(() =>
    this.translatedTextPage()
      ? this.translatedTextPage()!['MESSAGE_SUMMARY_CLIENT_DELETE_ERROR']
      : '',
  );
  private readonly DELETE_BUTTON_CONFIRM = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['DELETE_CLIENT_BUTTON_CONFIRM'] : '',
  );
  private readonly DELETE_BUTTON_CANCEL = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['DELETE_CLIENT_BUTTON_CANCEL'] : '',
  );
  private readonly DELETE_HEADER = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['DELETE_CLIENT_HEADER'] : '',
  );
  private readonly DELETE_MESSAGE = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['DELETE_CLIENT_MESSAGE'] : '',
  );

  protected readonly view = signal<'card' | 'table'>('table');

  protected readonly clients = toSignal(this.clientDataSource.clients$);
  protected readonly isLoading = toSignal(this.clientDataSource.loading$);

  constructor() {
    this.clientDataSource.loadClients();
  }

  onEdit(id: string): void {
    this.router.navigate(['/client/details', id]);
  }

  onDelete(id: string): void {
    const client = this.clients()?.find(c => c.id === id);
    if (!client) return;

    this.confirmationService.confirm({
      message: `
          ${this.DELETE_MESSAGE()}</br>
          ${client.name}</br>
          ${client.email}
      `,
      header: this.DELETE_HEADER(),
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: this.DELETE_BUTTON_CANCEL(),
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: this.DELETE_BUTTON_CONFIRM(),
        severity: 'danger',
      },
      accept: () => {
        this.clientDataSource.delete(id).subscribe(next => {
          if (next) {
            this.messageService.add({
              severity: 'success',
              detail: this.MESSAGE_SUCCESS(),
              summary: this.MESSAGE_SUMMARY_SUCCESS(),
            });
            return;
          }

          this.messageService.add({
            severity: 'error',
            detail: this.MESSAGE_ERROR(),
            summary: this.MESSAGE_SUMMARY_ERROR(),
          });
        });
      },
    });
  }

  goToNewClientPage(): void {
    this.router.navigate(['/client/create']);
  }

  onSearchValueChange(search: string): void {
    this.clientDataSource.loadClients({ search });
  }
}
