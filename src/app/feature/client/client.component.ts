import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-client',
  imports: [RouterOutlet, Menu, Ripple],
  template: `
    <div
      class="lg:min-h-[calc(100dvh-51.19px-74px)] h-full flex flex-col lg:flex-row flex-auto gap-2 pt-2"
    >
      <aside class="w-full lg:w-72 pb-2">
        <p-menu styleClass="h-full" [model]="items()">
          <ng-template #start>
            <span class="inline-flex p-4 font-bold">Menu Options</span>
          </ng-template>
          <ng-template #item let-item>
            <a pRipple class="flex items-center p-menu-item-link">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </ng-template>
        </p-menu>
      </aside>
      <div class="bg-gray-600 w-full rounded-sm p-2 mb-2">
        <router-outlet />
      </div>
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
export class ClientComponent {
  protected readonly items = signal<MenuItem[]>([
    {
      label: 'Add a new client',
    },
    {
      label: 'Edit a client ',
    },
    {
      label: 'List all clients',
    },
  ]);
}
