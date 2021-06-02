import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardvoluntariosComponent } from './dasboardvoluntarios.component';

describe('DasboardvoluntariosComponent', () => {
  let component: DasboardvoluntariosComponent;
  let fixture: ComponentFixture<DasboardvoluntariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardvoluntariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardvoluntariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
