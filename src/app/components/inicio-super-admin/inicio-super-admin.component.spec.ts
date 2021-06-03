import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSuperAdminComponent } from './inicio-super-admin.component';

describe('InicioSuperAdminComponent', () => {
  let component: InicioSuperAdminComponent;
  let fixture: ComponentFixture<InicioSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
