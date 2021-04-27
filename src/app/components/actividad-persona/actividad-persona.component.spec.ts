import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadPersonaComponent } from './actividad-persona.component';

describe('ActividadPersonaComponent', () => {
  let component: ActividadPersonaComponent;
  let fixture: ComponentFixture<ActividadPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
