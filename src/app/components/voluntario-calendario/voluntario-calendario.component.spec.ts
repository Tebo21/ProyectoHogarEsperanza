import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioCalendarioComponent } from './voluntario-calendario.component';

describe('VoluntarioCalendarioComponent', () => {
  let component: VoluntarioCalendarioComponent;
  let fixture: ComponentFixture<VoluntarioCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntarioCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntarioCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
