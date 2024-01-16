import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRolesPermissionComponent } from './admin-roles-permission.component';

describe('AdminRolesPermissionComponent', () => {
  let component: AdminRolesPermissionComponent;
  let fixture: ComponentFixture<AdminRolesPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRolesPermissionComponent]
    });
    fixture = TestBed.createComponent(AdminRolesPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
