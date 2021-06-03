import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDonacionComponent } from './entrega-donacion.component';

describe('EntregaDonacionComponent', () => {
  let component: EntregaDonacionComponent;
  let fixture: ComponentFixture<EntregaDonacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaDonacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
