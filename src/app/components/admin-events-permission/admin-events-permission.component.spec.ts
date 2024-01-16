import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsPermissionComponent } from './admin-events-permission.component';

describe('AdminEventsPermissionComponent', () => {
  let component: AdminEventsPermissionComponent;
  let fixture: ComponentFixture<AdminEventsPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEventsPermissionComponent]
    });
    fixture = TestBed.createComponent(AdminEventsPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
