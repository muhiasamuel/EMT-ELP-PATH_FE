import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersWidgetsComponent } from './admin-users-widgets.component';

describe('AdminUsersWidgetsComponent', () => {
  let component: AdminUsersWidgetsComponent;
  let fixture: ComponentFixture<AdminUsersWidgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsersWidgetsComponent]
    });
    fixture = TestBed.createComponent(AdminUsersWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
