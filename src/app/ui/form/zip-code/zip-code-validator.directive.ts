import { Directive, forwardRef, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { IAddressDto, ZipCodeService } from './zip-code.service';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[appZipCodeValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ZipCodeValidatorDirective),
      multi: true,
    },
  ],
})
export class ZipCodeValidatorDirective implements AsyncValidator {
  private readonly http = inject(HttpClient);
  private readonly zipCodeService = inject(ZipCodeService);

  validate(
    control: AbstractControl,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const zipCode = control.value as string;

    if (zipCode.length < 8) return of({ zipCodeApiError: true });

    return of(zipCode).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(zipCode => zipCode.replace('-', '')),
      filter(zipCode => zipCode.length === 8),
      switchMap(zipCode =>
        this.http.get(`https://viacep.com.br/ws/${zipCode}/json/`).pipe(
          map(next => {
            console.log({ next });
            // @ts-ignore
            if (next['erro']) {
              return { zipCodeApiError: true };
            }
            this.zipCodeService.emitNewAddressValues(next as IAddressDto);
            return null;
          }),
          catchError(() => of({ zipCodeApiError: true })),
        ),
      ),
      take(1),
    );
  }
}
