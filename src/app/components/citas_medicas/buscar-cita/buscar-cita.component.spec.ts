import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCitaComponent } from './buscar-cita.component';

describe('BuscarCitaComponent', () => {
  let component: BuscarCitaComponent;
  let fixture: ComponentFixture<BuscarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
