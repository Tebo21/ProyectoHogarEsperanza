import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosPersonaComponent } from './documentos-persona.component';

describe('DocumentosPersonaComponent', () => {
  let component: DocumentosPersonaComponent;
  let fixture: ComponentFixture<DocumentosPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
