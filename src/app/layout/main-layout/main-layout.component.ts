import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../ui/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../ui/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  template: `
    <app-header />
    <main class="px-2 min-h-[calc(100dvh-51.19px-66px)] w-full">
      <router-outlet />
    </main>
    <app-footer />
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
export class MainLayoutComponent {}
