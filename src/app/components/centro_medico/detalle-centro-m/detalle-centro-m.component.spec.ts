import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCentroMComponent } from './detalle-centro-m.component';

describe('DetalleCentroMComponent', () => {
  let component: DetalleCentroMComponent;
  let fixture: ComponentFixture<DetalleCentroMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCentroMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCentroMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
