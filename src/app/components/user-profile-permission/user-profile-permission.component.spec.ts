import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePermissionComponent } from './user-profile-permission.component';

describe('UserProfilePermissionComponent', () => {
  let component: UserProfilePermissionComponent;
  let fixture: ComponentFixture<UserProfilePermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfilePermissionComponent]
    });
    fixture = TestBed.createComponent(UserProfilePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
