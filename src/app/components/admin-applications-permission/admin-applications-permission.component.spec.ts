import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationsPermissionComponent } from './admin-applications-permission.component';

describe('AdminApplicationsPermissionComponent', () => {
  let component: AdminApplicationsPermissionComponent;
  let fixture: ComponentFixture<AdminApplicationsPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApplicationsPermissionComponent]
    });
    fixture = TestBed.createComponent(AdminApplicationsPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
