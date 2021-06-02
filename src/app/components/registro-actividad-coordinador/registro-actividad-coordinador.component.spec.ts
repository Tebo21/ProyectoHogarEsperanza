import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroActividadCoordinadorComponent } from './registro-actividad-coordinador.component';

describe('RegistroActividadCoordinadorComponent', () => {
  let component: RegistroActividadCoordinadorComponent;
  let fixture: ComponentFixture<RegistroActividadCoordinadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroActividadCoordinadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroActividadCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
