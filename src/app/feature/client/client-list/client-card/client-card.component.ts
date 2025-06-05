import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Client } from '../../../../core/db/mock-data';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-client-card',
  imports: [Card, Button, TranslatePipe],
  template: `
    <p-card
      [style]="{
        minHeight: '190px',
        display: 'flex',
        justifyContent: 'center',
      }"
    >
      <ng-template #title> {{ client().name }} </ng-template>
      <ng-template #subtitle> {{ client().email }} </ng-template>
      @if (client().phone) {
        <p>{{ client().phone }}</p>
      } @else {
        <span class="h-6 block"></span>
      }
      <ng-template #footer>
        <div class="flex gap-4 mt-1">
          <p-button
            [outlined]="true"
            [label]="'CLIENT_LIST_ACTION_EDIT' | translate"
            severity="secondary"
            class="w-full"
            styleClass="w-full"
            (onClick)="onEdit()"
          />
          <p-button
            [outlined]="true"
            [label]="'CLIENT_LIST_ACTION_DELETE' | translate"
            severity="danger"
            class="w-full"
            styleClass="w-full"
            (onClick)="onDelete()"
          />
        </div>
      </ng-template>
    </p-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCardComponent {
  readonly client = input.required<Client>();
  readonly edit = output<string>();
  readonly delete = output<string>();

  protected onEdit(): void {
    this.edit.emit(this.client().id);
  }

  protected onDelete(): void {
    this.delete.emit(this.client().id);
  }
}
