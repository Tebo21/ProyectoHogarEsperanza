import { TestBed } from '@angular/core/testing';

import { CitaMedicaService } from './cita-medica.service';

describe('CitaMedicaService', () => {
  let service: CitaMedicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaMedicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
