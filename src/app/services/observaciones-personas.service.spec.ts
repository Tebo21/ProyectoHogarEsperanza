import { TestBed } from '@angular/core/testing';

import { ObservacionesPersonasService } from './observaciones-personas.service';

describe('ObservacionesPersonasService', () => {
  let service: ObservacionesPersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservacionesPersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
