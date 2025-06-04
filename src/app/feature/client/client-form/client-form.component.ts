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
import { IAddressForm, ZipCodeService } from '../../../ui/form/zip-code/zip-code.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ZipCodeValidatorDirective } from '../../../ui/form/zip-code/zip-code-validator.directive';
import { EmailTakenValidatorDirective } from '../../../ui/form/email-taken/email-taken-validator.directive';
import { ClientDatasource } from '../client.datasource';

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
  imports: [
    ReactiveFormsModule,
    InputMaskModule,
    Fieldset,
    IftaLabel,
    InputText,
    Message,
    ZipCodeValidatorDirective,
    EmailTakenValidatorDirective,
    Button,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly zipCodeService = inject(ZipCodeService);
  private readonly addressValuesFromCurrentZipCode = toSignal(
    this.zipCodeService.getAddressValuesFromCurrentZipCode(),
  );
  private readonly effectRef!: EffectRef;
  private readonly clientDatasource = inject(ClientDatasource);
  isLoading = toSignal(this.clientDatasource.crudLoading$);

  protected readonly form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿÇç]+(?: [A-Za-zÀ-ÖØ-öø-ÿÇç]+)*$/),
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
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿÇç]+(?: [A-Za-zÀ-ÖØ-öø-ÿÇç]+)*$/),
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
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿÇç]+(?: [A-Za-zÀ-ÖØ-öø-ÿÇç]+)*$/),
        ],
      ],
      state: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿÇç]+(?: [A-Za-zÀ-ÖØ-öø-ÿÇç]+)*$/),
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

      if (this.addressValuesFromCurrentZipCode() !== null) {
        this.updateFormAddress(this.addressValuesFromCurrentZipCode()!);
      }
    });
  }

  private updateFormValues(): void {
    const initialValue = this.initialValue();
    if (initialValue === null) return;

    this.form.get('name')?.setValue(initialValue.name);
    this.form.get('email')?.setValue(initialValue.email);
    this.form.get('phone')?.setValue(initialValue.phone);

    this.updateFormAddress(initialValue.address);

    this.form.updateValueAndValidity();
  }

  private updateFormAddress(values: IAddressForm) {
    const addressFormGroup = this.form.get('address');

    addressFormGroup?.get('street')?.setValue(values.street);
    addressFormGroup?.get('state')?.setValue(values.state);
    addressFormGroup?.get('city')?.setValue(values.city);
    addressFormGroup?.get('number')?.setValue(values.number ?? '');

    if (values.zipCode) {
      addressFormGroup?.get('zipCode')?.setValue(values.zipCode);
    }
  }

  protected onSave(): void {
    if (this.form.valid) {
      const value = <IClientFormValue>this.form.value;

      this.save.emit(value);
    }
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
    this.zipCodeService.clearAddressValuesFromCurrentZipCode();
  }
}
