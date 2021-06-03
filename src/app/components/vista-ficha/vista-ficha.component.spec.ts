import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaFichaComponent } from './vista-ficha.component';

describe('VistaFichaComponent', () => {
  let component: VistaFichaComponent;
  let fixture: ComponentFixture<VistaFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
