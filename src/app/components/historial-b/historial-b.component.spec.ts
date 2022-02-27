import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialBComponent } from './historial-b.component';

describe('HistorialBComponent', () => {
  let component: HistorialBComponent;
  let fixture: ComponentFixture<HistorialBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
