import { TestBed } from '@angular/core/testing';

import { PayementRdvService } from './payement-rdv.service';

describe('PayementRdvService', () => {
  let service: PayementRdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayementRdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
