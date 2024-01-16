import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivitiesComponent } from './user-activities.component';

describe('UserActivitiesComponent', () => {
  let component: UserActivitiesComponent;
  let fixture: ComponentFixture<UserActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserActivitiesComponent]
    });
    fixture = TestBed.createComponent(UserActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
