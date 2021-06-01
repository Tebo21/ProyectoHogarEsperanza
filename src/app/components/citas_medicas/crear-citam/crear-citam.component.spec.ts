import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCitamComponent } from './crear-citam.component';

describe('CrearCitamComponent', () => {
  let component: CrearCitamComponent;
  let fixture: ComponentFixture<CrearCitamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCitamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCitamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
