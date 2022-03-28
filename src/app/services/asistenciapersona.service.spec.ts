import { TestBed } from '@angular/core/testing';

import { AsistenciapersonaService } from './asistenciapersona.service';

describe('AsistenciapersonaService', () => {
  let service: AsistenciapersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciapersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
