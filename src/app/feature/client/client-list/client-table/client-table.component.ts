import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Client } from '../../../../core/db/mock-data';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-client-table',
  imports: [TableModule, Button],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTableComponent {
  readonly clients = input<Client[]>([]);

  readonly edit = output<string>();
  readonly delete = output<string>();

  protected onEdit(id: string): void {
    this.edit.emit(id);
  }

  protected onDelete(id: string): void {
    this.delete.emit(id);
  }
}
