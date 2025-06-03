import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientFormComponent, IClientFormValue } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-create',
  imports: [ClientFormComponent],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCreateComponent {
  protected onSave(clientFormValue: IClientFormValue): void {
    console.log(clientFormValue);
  }
}
