import { Directive, forwardRef, inject, input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import { Client } from '../../../core/db/mock-data';

@Directive({
  selector: '[appIsEmailTaken]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailTakenValidatorDirective),
      multi: true,
    },
  ],
})
export class EmailTakenValidatorDirective implements AsyncValidator {
  private readonly http = inject(HttpClient);

  idClient = input<string | undefined | null>(null);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    if (!email) return of(null);

    return of(email).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(email => this.http.get<Client[]>('api/clients')),
      map(next =>
        next
          .filter(c => (this.idClient ? this.idClient() !== c.id : c))
          .map(c => c.email)
          .includes(email)
          ? { emailTaken: true }
          : null,
      ),
    );
  }
}
