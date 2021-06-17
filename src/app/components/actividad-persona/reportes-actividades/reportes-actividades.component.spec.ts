import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesActividadesComponent } from './reportes-actividades.component';

describe('ReportesActividadesComponent', () => {
  let component: ReportesActividadesComponent;
  let fixture: ComponentFixture<ReportesActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
