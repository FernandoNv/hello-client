import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientDatasource } from '../client.datasource';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientFormComponent, IClientFormValue } from '../client-form/client-form.component';
import { Client } from '../../../core/db/mock-data';
import { map, switchMap, take, tap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';

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
          summary: 'Success',
          detail: 'Client Updated!',
        });
        timer(1300)
          .pipe(take(1))
          .subscribe(_ => this.router.navigateByUrl('/'));

        return;
      }
      this.messageService.add({
        severity: 'error',
        summary: 'Unable to update the client',
        detail: 'Something went wrong.',
      });
    });
  }
}
