import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaObservacionesPersonasComponent } from './lista-observaciones-personas.component';

describe('ListaObservacionesPersonasComponent', () => {
  let component: ListaObservacionesPersonasComponent;
  let fixture: ComponentFixture<ListaObservacionesPersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaObservacionesPersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaObservacionesPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
