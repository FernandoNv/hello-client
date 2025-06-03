import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="px-2">
      <div class="py-2 bg-gray-900 flex justify-center rounded">
        <small class="text-gray-100">Fernando Vieira</small>
      </div>
    </footer>
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
export class FooterComponent {}
