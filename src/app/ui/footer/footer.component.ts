import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="p-2">
      <div class="py-2 flex justify-center rounded">
        <small>Fernando Vieira</small>
      </div>
    </footer>
  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: block;

      footer > div {
        border: 1px solid var(--p-menubar-border-color);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
