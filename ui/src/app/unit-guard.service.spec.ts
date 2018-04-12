import { TestBed, inject } from '@angular/core/testing';

import { UnitGuardService } from './unit-guard.service';

describe('UnitGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitGuardService]
    });
  });

  it('should be created', inject([UnitGuardService], (service: UnitGuardService) => {
    expect(service).toBeTruthy();
  }));
});
