import { TestBed } from '@angular/core/testing';

import { FichaSocioeconomicaService } from './ficha-socioeconomica.service';

describe('FichaSocioeconomicaService', () => {
  let service: FichaSocioeconomicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaSocioeconomicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
