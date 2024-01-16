import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedsPermissionComponent } from './user-feeds-permission.component';

describe('UserFeedsPermissionComponent', () => {
  let component: UserFeedsPermissionComponent;
  let fixture: ComponentFixture<UserFeedsPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFeedsPermissionComponent]
    });
    fixture = TestBed.createComponent(UserFeedsPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
