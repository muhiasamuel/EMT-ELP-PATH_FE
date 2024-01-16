import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubActivitiesComponent } from './admin-hub-activities.component';

describe('AdminHubActivitiesComponent', () => {
  let component: AdminHubActivitiesComponent;
  let fixture: ComponentFixture<AdminHubActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubActivitiesComponent]
    });
    fixture = TestBed.createComponent(AdminHubActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
