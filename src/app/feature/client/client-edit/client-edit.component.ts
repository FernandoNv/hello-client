import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ClientDatasource } from '../client.datasource';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientFormComponent, IClientFormValue } from '../client-form/client-form.component';
import { Client } from '../../../core/db/mock-data';
import { map, switchMap, take, tap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TranslatedValuesService } from '../../../core/translated-values/translated-values.service';

@Component({
  selector: 'app-client-edit',
  imports: [ClientFormComponent, ProgressSpinner],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditComponent {
  private readonly clientDataSource = inject(ClientDatasource);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly translate = inject(TranslatedValuesService);
  private readonly translatedTextPage = this.translate.translatedTextPage;

  private readonly MESSAGE_SUCCESS = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['MESSAGE_CLIENT_UPDATED_SUCCESS'] : '',
  );
  private readonly MESSAGE_SUMMARY_SUCCESS = computed(() =>
    this.translatedTextPage()
      ? this.translatedTextPage()!['MESSAGE_SUMMARY_CLIENT_UPDATED_SUCCESS']
      : '',
  );
  private readonly MESSAGE_ERROR = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['MESSAGE_CLIENT_UPDATED_ERROR'] : '',
  );
  private readonly MESSAGE_SUMMARY_ERROR = computed(() =>
    this.translatedTextPage()
      ? this.translatedTextPage()!['MESSAGE_SUMMARY_CLIENT_UPDATED_ERROR']
      : '',
  );

  protected id!: string;
  private readonly client$ = this.activatedRoute.params.pipe(
    map(params => params['id'] as string),
    tap(id => (this.id = id)),
    switchMap(id => this.clientDataSource.getById(id)),
  );

  protected readonly client = toSignal(this.client$, { initialValue: null });
  protected readonly isLoading = toSignal(this.clientDataSource.crudLoading$, {
    initialValue: true,
  });

  protected onSave(clientFormValue: IClientFormValue): void {
    clientFormValue.id = this.id;
    // debugger;
    this.clientDataSource.update(this.id, clientFormValue as Client).subscribe(next => {
      if (next) {
        this.messageService.add({
          severity: 'success',
          detail: this.MESSAGE_SUCCESS(),
          summary: this.MESSAGE_SUMMARY_SUCCESS(),
        });
        timer(1300)
          .pipe(take(1))
          .subscribe(_ => this.router.navigateByUrl('/'));

        return;
      }

      this.messageService.add({
        severity: 'error',
        detail: this.MESSAGE_ERROR(),
        summary: this.MESSAGE_SUMMARY_ERROR(),
      });
    });
  }
}
