import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCompletoComponent } from './historial-completo.component';

describe('HistorialCompletoComponent', () => {
  let component: HistorialCompletoComponent;
  let fixture: ComponentFixture<HistorialCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
