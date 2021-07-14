import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDocumentosComponent } from './editar-documentos.component';

describe('EditarDocumentosComponent', () => {
  let component: EditarDocumentosComponent;
  let fixture: ComponentFixture<EditarDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
