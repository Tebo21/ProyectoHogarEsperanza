import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPruebaComponent } from './calendar-prueba.component';

describe('CalendarPruebaComponent', () => {
  let component: CalendarPruebaComponent;
  let fixture: ComponentFixture<CalendarPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
