import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { Avatar } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedValuesService } from '../../core/translated-values/translated-values.service';

@Component({
  selector: 'app-header',
  imports: [Menubar, Avatar, Ripple, RouterLink, Button],
  template: `
    <header class="pt-2 px-2">
      <p-menubar [model]="items()">
        <ng-template #start>
          <p class="text-xl font-bold">HelloClient</p>
        </ng-template>
        <ng-template #item let-item let-root="root">
          <a pRipple class="flex items-center p-menubar-item-link" [routerLink]="item.route">
            <span>{{ item.label }}</span>
          </a>
        </ng-template>
        <ng-template #end>
          <div class="flex items-center justify-center gap-4">
            <p-button
              rounded
              outlined
              severity="secondary"
              size="small"
              (click)="changeThemeMode()"
              [icon]="'pi ' + themeIcon()"
              aria-label="theme-selector"
            />
            <p-avatar image="https://avatars.githubusercontent.com/u/35479927" shape="circle" />
          </div>
        </ng-template>
      </p-menubar>
    </header>
  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  private readonly translate = inject(TranslateService);
  private readonly translatedValuesService = inject(TranslatedValuesService);
  private readonly translatedTextPage = this.translatedValuesService.translatedTextPage;
  private effectRef!: EffectRef;

  protected themeIcon = signal<'pi-moon' | 'pi-sun'>('pi-moon');
  protected items = signal<MenuItem[]>([]);

  constructor() {
    this.effectRef = effect(() => {
      if (this.translatedTextPage()) {
        this.setMenuItems();
      }
    });
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }

  protected changeThemeMode(): void {
    const element = document.querySelector('html');
    if (element === null) return;
    element.classList.toggle('dark');
    this.themeIcon.update(prev => (prev === 'pi-moon' ? 'pi-sun' : 'pi-moon'));
  }

  private setMenuItems() {
    const values = this.translatedTextPage();
    if (values) {
      const home = values['MENU_HEADER_OPTION.HOME'];
      const client = values['MENU_HEADER_OPTION.CLIENT'];
      const clientCreate = values['MENU_HEADER_OPTION.CLIENT_CREATE_CLIENT'];
      const clientList = values['MENU_HEADER_OPTION.CLIENT_LIST_CLIENTS'];

      this.items.set([
        {
          label: home,
          icon: 'pi pi-home',
          route: '/',
        },
        {
          label: client,
          icon: 'pi pi-home',
          items: [
            {
              label: clientCreate,
              icon: 'pi pi-home',
              route: '/client/create',
            },
            {
              label: clientList,
              icon: 'pi pi-home',
              route: '/client/list',
            },
          ],
        },
      ]);
    }
  }
}
