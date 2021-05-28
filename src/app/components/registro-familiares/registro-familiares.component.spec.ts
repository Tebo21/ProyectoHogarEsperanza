import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFamiliaresComponent } from './registro-familiares.component';

describe('RegistroFamiliaresComponent', () => {
  let component: RegistroFamiliaresComponent;
  let fixture: ComponentFixture<RegistroFamiliaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroFamiliaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFamiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
