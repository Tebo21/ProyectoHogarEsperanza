import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegiblesComponent } from './elegibles.component';

describe('ElegiblesComponent', () => {
  let component: ElegiblesComponent;
  let fixture: ComponentFixture<ElegiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
