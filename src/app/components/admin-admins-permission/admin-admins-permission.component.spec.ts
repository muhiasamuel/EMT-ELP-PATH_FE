import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminsPermissionComponent } from './admin-admins-permission.component';

describe('AdminAdminsPermissionComponent', () => {
  let component: AdminAdminsPermissionComponent;
  let fixture: ComponentFixture<AdminAdminsPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAdminsPermissionComponent]
    });
    fixture = TestBed.createComponent(AdminAdminsPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
