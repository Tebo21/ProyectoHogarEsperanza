import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentroComponent } from './list-centro.component';

describe('ListCentroComponent', () => {
  let component: ListCentroComponent;
  let fixture: ComponentFixture<ListCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
