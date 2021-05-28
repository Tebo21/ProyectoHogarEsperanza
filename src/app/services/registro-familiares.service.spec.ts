import { TestBed } from '@angular/core/testing';

import { RegistroFamiliaresService } from './registro-familiares.service';

describe('RegistroFamiliaresService', () => {
  let service: RegistroFamiliaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroFamiliaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
