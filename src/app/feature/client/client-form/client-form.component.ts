import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { Button } from 'primeng/button';
import { Fieldset } from 'primeng/fieldset';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';

export interface IClientFormValue {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    zipCode: string;
    number: string;
    city: string;
    state: string;
  };
}

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule, InputMaskModule, Button, Fieldset, IftaLabel, InputText, Message],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly effectRef!: EffectRef;

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
    phone: ['', [Validators.pattern(/^[1-9][0-9] [1-9][0-9]{3,4}-[0-9]{4}$/)]],
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
      number: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
          Validators.min(1),
          Validators.max(99999),
        ],
      ],
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
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/),
        ],
      ],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
    }),
  });

  protected readonly initialValue = input<IClientFormValue | null>(null);
  protected readonly save = output<IClientFormValue>();

  constructor() {
    this.effectRef = effect(() => {
      if (this.initialValue()) {
        this.updateFormValues();
      }
    });
  }

  private updateFormValues(): void {
    const initialValue = this.initialValue();
    if (initialValue === null) return;

    this.form.get('name')?.setValue(initialValue.name);
    this.form.get('email')?.setValue(initialValue.email);
    this.form.get('phone')?.setValue(initialValue.phone);

    const addressFormGroup = this.form.get('address');

    addressFormGroup?.get('street')?.setValue(initialValue.address.street);
    addressFormGroup?.get('state')?.setValue(initialValue.address.state);
    addressFormGroup?.get('city')?.setValue(initialValue.address.city);
    addressFormGroup?.get('number')?.setValue(initialValue.address.number);
    addressFormGroup?.get('zipCode')?.setValue(initialValue.address.zipCode);

    this.form.updateValueAndValidity();
  }

  protected onSave(): void {
    if (this.form.valid) {
      const value = <IClientFormValue>this.form.value;

      this.save.emit(value);
    }
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }
}
