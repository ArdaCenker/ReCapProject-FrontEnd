import { TestBed } from '@angular/core/testing';

import { RentalDtoService } from './rental-dto.service';

describe('RentalDtoService', () => {
  let service: RentalDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
