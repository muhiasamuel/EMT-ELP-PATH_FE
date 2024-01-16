import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRolesComponent } from './admin-roles.component';

describe('AdminRolesComponent', () => {
  let component: AdminRolesComponent;
  let fixture: ComponentFixture<AdminRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRolesComponent]
    });
    fixture = TestBed.createComponent(AdminRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
