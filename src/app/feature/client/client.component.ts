import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { TranslatedValuesService } from '../../core/translated-values/translated-values.service';

@Component({
  selector: 'app-client',
  imports: [RouterOutlet, Menu, Ripple, RouterLink],
  template: `
    <div class="lg:h-[calc(100dvh-74px-53.19px)] flex flex-col lg:flex-row flex-auto gap-2 pt-2">
      <aside class="hidden lg:block lg:w-72 pb-2">
        <p-menu styleClass="h-full" [model]="items()">
          <ng-template #start>
            <span class="inline-flex p-4 font-bold" i18n>Menu Options</span>
          </ng-template>
          <ng-template #item let-item>
            <a pRipple class="flex items-center p-menu-item-link" [routerLink]="item.routerLink">
              <span [class]="item.icon"></span>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </ng-template>
        </p-menu>
      </aside>
      <div class="w-full h-full rounded-sm p-2 mb-2">
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
export class ClientComponent implements OnDestroy {
  private readonly translate = inject(TranslatedValuesService);
  private readonly translatedTextPage = this.translate.translatedTextPage;
  private effectRef!: EffectRef;

  constructor() {
    this.effectRef = effect(() => {
      if (this.translatedTextPage()) {
        this.setMenuItems();
      }
    });
  }

  protected readonly items = signal<MenuItem[]>([]);

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }

  private setMenuItems() {
    const values = this.translatedTextPage();
    if (values) {
      const clientCreate = values['MENU_SIDE_OPTION_CREATE_CLIENT'];
      const clientList = values['MENU_SIDE_OPTION_LIST_CLIENTS'];

      this.items.set([
        {
          label: clientCreate,
          routerLink: './create',
        },
        {
          label: clientList,
          routerLink: './list',
        },
      ]);
    }
  }
}
