import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-client-toolbar',
  imports: [Button, IconField, InputIcon, InputText, Toolbar, FormsModule, AsyncPipe],
  templateUrl: './client-toolbar.component.html',
  styleUrl: './client-toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientToolbarComponent {
  private readonly searchValue$ = new Subject<string>();

  readonly view = model.required<'card' | 'table'>();
  readonly newClientClick = output<void>();
  readonly searchChange = output<string>();

  protected search: string = '';

  protected search$ = this.searchValue$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap(newSearch => (newSearch !== undefined ? this.searchChange.emit(newSearch) : '')),
  );

  onValueChange(event: string) {
    this.searchValue$.next(event);
  }
}
