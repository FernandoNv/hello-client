import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientFormComponent, IClientFormValue } from '../client-form/client-form.component';
import { ClientDatasource } from '../client.datasource';
import { Client } from '../../../core/db/mock-data';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-client-create',
  imports: [ClientFormComponent, Toast],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCreateComponent {
  private readonly clientDataSource = inject(ClientDatasource);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  constructor() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  protected onSave(clientFormValue: IClientFormValue): void {
    this.clientDataSource.create(clientFormValue as Client).subscribe(next => {
      console.log(next);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Client created!',
      });
      timer(1000)
        .pipe(take(1))
        .subscribe(next => this.router.navigateByUrl('/'));
    });
  }
}
