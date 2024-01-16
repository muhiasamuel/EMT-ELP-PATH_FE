import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivityPermissionComponent } from './admin-activity-permission.component';

describe('AdminActivityPermissionComponent', () => {
  let component: AdminActivityPermissionComponent;
  let fixture: ComponentFixture<AdminActivityPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminActivityPermissionComponent]
    });
    fixture = TestBed.createComponent(AdminActivityPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
