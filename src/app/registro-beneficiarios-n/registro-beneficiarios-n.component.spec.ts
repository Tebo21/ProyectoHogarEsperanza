import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBeneficiariosNComponent } from './registro-beneficiarios-n.component';

describe('RegistroBeneficiariosNComponent', () => {
  let component: RegistroBeneficiariosNComponent;
  let fixture: ComponentFixture<RegistroBeneficiariosNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroBeneficiariosNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroBeneficiariosNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
