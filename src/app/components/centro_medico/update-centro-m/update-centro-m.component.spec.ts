import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCentroMComponent } from './update-centro-m.component';

describe('UpdateCentroMComponent', () => {
  let component: UpdateCentroMComponent;
  let fixture: ComponentFixture<UpdateCentroMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCentroMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCentroMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
