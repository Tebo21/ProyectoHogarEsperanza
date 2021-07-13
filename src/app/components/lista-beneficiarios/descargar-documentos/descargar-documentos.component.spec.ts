import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarDocumentosComponent } from './descargar-documentos.component';

describe('DescargarDocumentosComponent', () => {
  let component: DescargarDocumentosComponent;
  let fixture: ComponentFixture<DescargarDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
