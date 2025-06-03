import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../ui/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../ui/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  template: `
    <app-header />
    <main class="min-h-[calc(100dvh-51.19px-58px)] w-full">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
