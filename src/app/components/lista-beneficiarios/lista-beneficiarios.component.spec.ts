import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBeneficiariosComponent } from './lista-beneficiarios.component';

describe('ListaBeneficiariosComponent', () => {
  let component: ListaBeneficiariosComponent;
  let fixture: ComponentFixture<ListaBeneficiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaBeneficiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
