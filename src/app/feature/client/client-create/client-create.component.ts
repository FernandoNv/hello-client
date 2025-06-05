import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ClientFormComponent, IClientFormValue } from '../client-form/client-form.component';
import { ClientDatasource } from '../client.datasource';
import { Client } from '../../../core/db/mock-data';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { TranslatedValuesService } from '../../../core/translated-values/translated-values.service';

@Component({
  selector: 'app-client-create',
  imports: [ClientFormComponent],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCreateComponent {
  private readonly clientDataSource = inject(ClientDatasource);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  private readonly translate = inject(TranslatedValuesService);
  private readonly translatedTextPage = this.translate.translatedTextPage;

  private readonly MESSAGE_SUCCESS = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['MESSAGE_CLIENT_CREATED_SUCCESS'] : '',
  );
  private readonly MESSAGE_SUMMARY_SUCCESS = computed(() =>
    this.translatedTextPage()
      ? this.translatedTextPage()!['MESSAGE_SUMMARY_CLIENT_CREATED_SUCCESS']
      : '',
  );
  private readonly MESSAGE_ERROR = computed(() =>
    this.translatedTextPage() ? this.translatedTextPage()!['MESSAGE_CLIENT_CREATED_ERROR'] : '',
  );
  private readonly MESSAGE_SUMMARY_ERROR = computed(() =>
    this.translatedTextPage()
      ? this.translatedTextPage()!['MESSAGE_SUMMARY_CLIENT_CREATED_ERROR']
      : '',
  );

  protected onSave(clientFormValue: IClientFormValue): void {
    this.clientDataSource.create(clientFormValue as Client).subscribe(next => {
      console.log(next);
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
