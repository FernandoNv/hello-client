import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ClientCardComponent } from '../client-card/client-card.component';
import { Client } from '../../../../core/db/mock-data';
import { Paginator, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-client-card-list',
  imports: [ClientCardComponent, Paginator],
  template: `
    <div class="w-full  h-[83%] pb-1 lg:pr-2 overflow-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
        @for (client of clientsToDisplay(); track client.id) {
          <app-client-card [client]="client" (edit)="onEdit($event)" (delete)="onDelete($event)" />
        } @empty {
          <p>No data...</p>
        }
      </div>
      <p-paginator
        (onPageChange)="onPageChange($event)"
        [first]="0"
        [rows]="5"
        [totalRecords]="clients().length"
        [rowsPerPageOptions]="[5, 10, 20]"
      />
    </div>
  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCardListComponent {
  private readonly paginator = signal<PaginatorState>({
    page: 0,
    first: 0,
    rows: 5,
    pageCount: 10,
  });

  readonly clients = input<Client[]>([]);
  readonly edit = output<string>();
  readonly delete = output<string>();

  protected clientsToDisplay = computed(() => {
    const clients = this.clients();
    const paginator = this.paginator();

    return clients.slice(paginator.first, paginator.first! + paginator.rows!);
  });

  protected onEdit(id: string): void {
    this.edit.emit(id);
  }

  protected onDelete(id: string): void {
    this.delete.emit(id);
  }

  onPageChange(paginatorState: PaginatorState) {
    this.paginator.set(paginatorState);
  }
}
