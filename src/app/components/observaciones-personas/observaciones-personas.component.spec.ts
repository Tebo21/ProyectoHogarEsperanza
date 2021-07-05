import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesPersonasComponent } from './observaciones-personas.component';

describe('ObservacionesPersonasComponent', () => {
  let component: ObservacionesPersonasComponent;
  let fixture: ComponentFixture<ObservacionesPersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservacionesPersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
