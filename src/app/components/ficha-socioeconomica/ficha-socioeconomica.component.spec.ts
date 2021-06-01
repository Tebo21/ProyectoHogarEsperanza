import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSocioeconomicaComponent } from './ficha-socioeconomica.component';

describe('FichaSocioeconomicaComponent', () => {
  let component: FichaSocioeconomicaComponent;
  let fixture: ComponentFixture<FichaSocioeconomicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaSocioeconomicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSocioeconomicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
