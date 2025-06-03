import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { Fieldset } from 'primeng/fieldset';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-client-create',
  imports: [ReactiveFormsModule, IftaLabel, InputText, InputMaskModule, Fieldset, Button],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCreateComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.maxLength(255),
      ],
    ],
    phone: [''],
    address: this.fb.group({
      street: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
        ],
      ],
      number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
        ],
      ],
      state: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
        ],
      ],
      zipCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    }),
  });
}
