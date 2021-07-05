import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBeneficiariosComponent } from './editar-beneficiarios.component';

describe('EditarBeneficiariosComponent', () => {
  let component: EditarBeneficiariosComponent;
  let fixture: ComponentFixture<EditarBeneficiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarBeneficiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
