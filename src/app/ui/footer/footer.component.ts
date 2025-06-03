import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="bg-gray-900 p-4">
      <div class="mx-auto container flex justify-center">
        <small class="text-gray-100">Fernando Vieira</small>
      </div>
    </footer>
  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
