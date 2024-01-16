import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChaptersPermissionComponent } from './admin-chapters-permission.component';

describe('AdminChaptersPermissionComponent', () => {
  let component: AdminChaptersPermissionComponent;
  let fixture: ComponentFixture<AdminChaptersPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChaptersPermissionComponent]
    });
    fixture = TestBed.createComponent(AdminChaptersPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
