import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { Avatar } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';

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
export class HeaderComponent {
  protected themeIcon = signal<'pi-moon' | 'pi-sun'>('pi-moon');
  protected items = signal<MenuItem[]>([
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/',
    },
    {
      label: 'Client',
      icon: 'pi pi-home',
      items: [
        {
          label: 'Create a new client',
          icon: 'pi pi-home',
          route: '/client/create',
        },
        {
          label: 'List all clients',
          icon: 'pi pi-home',
          route: '/client/list',
        },
      ],
    },
  ]);

  protected changeThemeMode(): void {
    const element = document.querySelector('html');
    if (element === null) return;
    element.classList.toggle('dark');
    this.themeIcon.update(prev => (prev === 'pi-moon' ? 'pi-sun' : 'pi-moon'));
  }
}
