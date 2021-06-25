import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProductoDonadoComponent } from './listar-producto-donado.component';

describe('ListarProductoDonadoComponent', () => {
  let component: ListarProductoDonadoComponent;
  let fixture: ComponentFixture<ListarProductoDonadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProductoDonadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductoDonadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
