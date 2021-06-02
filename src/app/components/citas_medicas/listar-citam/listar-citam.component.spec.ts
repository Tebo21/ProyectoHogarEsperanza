import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCitamComponent } from './listar-citam.component';

describe('ListarCitamComponent', () => {
  let component: ListarCitamComponent;
  let fixture: ComponentFixture<ListarCitamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCitamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCitamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
