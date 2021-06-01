import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDonacionesComponent } from './entrega-donaciones.component';

describe('EntregaDonacionesComponent', () => {
  let component: EntregaDonacionesComponent;
  let fixture: ComponentFixture<EntregaDonacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaDonacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
