import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IAddressForm {
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  number?: string;
}

export interface IAddressDto {
  cep: string;
  logradouro: string;
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService {
  private readonly address$ = new BehaviorSubject<IAddressForm | null>(null);

  public emitNewAddressValues(next: IAddressDto) {
    const address: IAddressForm = {
      street: next.logradouro,
      city: next.localidade,
      state: next.uf,
    };

    this.address$.next(address);
  }

  public getAddressValuesFromCurrentZipCode(): Observable<IAddressForm | null> {
    return this.address$.asObservable();
  }

  public clearAddressValuesFromCurrentZipCode() {
    this.address$.next(null);
  }
}
