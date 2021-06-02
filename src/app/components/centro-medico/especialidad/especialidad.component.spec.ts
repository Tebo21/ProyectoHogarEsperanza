import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadComponent } from './especialidad.component';

describe('EspecialidadComponent', () => {
  let component: EspecialidadComponent;
  let fixture: ComponentFixture<EspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
