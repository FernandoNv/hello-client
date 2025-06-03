import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { Avatar } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [Menubar, Avatar, Ripple, RouterLink, ToggleSwitch, FormsModule],
  template: `
    <header>
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
            <p-toggleswitch class="flex justify-center" (click)="changeThemeMode()" />
            <p-avatar
              image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
              shape="circle"
            />
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
  protected items = signal([
    {
      label: 'Home',
      icon: 'pi pi-home',
      route: '/',
    },
    {
      label: 'Clients',
      icon: 'pi pi-home',
      route: '/clients',
    },
  ]);

  protected changeThemeMode(): void {
    const element = document.querySelector('html');
    if (element === null) return;
    element.classList.toggle('dark');
  }
}
