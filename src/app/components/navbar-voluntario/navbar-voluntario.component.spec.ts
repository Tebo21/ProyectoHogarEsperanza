import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarVoluntarioComponent } from './navbar-voluntario.component';

describe('NavbarVoluntarioComponent', () => {
  let component: NavbarVoluntarioComponent;
  let fixture: ComponentFixture<NavbarVoluntarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarVoluntarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
