import { TestBed } from '@angular/core/testing';

import { TranslatedValuesService } from './translated-values.service';

describe('TranslatedValuesService', () => {
  let service: TranslatedValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatedValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
