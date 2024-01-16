import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduledActivitiesCardComponent } from './admin-scheduled-activities-card.component';

describe('AdminScheduledActivitiesCardComponent', () => {
  let component: AdminScheduledActivitiesCardComponent;
  let fixture: ComponentFixture<AdminScheduledActivitiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminScheduledActivitiesCardComponent]
    });
    fixture = TestBed.createComponent(AdminScheduledActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
