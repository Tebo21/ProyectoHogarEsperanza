import { TestBed } from '@angular/core/testing';

import { CentroMedicoService } from './centro-medico.service';

describe('CentroMedicoService', () => {
  let service: CentroMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
