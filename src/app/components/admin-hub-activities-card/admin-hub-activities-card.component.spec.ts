import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubActivitiesCardComponent } from './admin-hub-activities-card.component';

describe('AdminHubActivitiesCardComponent', () => {
  let component: AdminHubActivitiesCardComponent;
  let fixture: ComponentFixture<AdminHubActivitiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubActivitiesCardComponent]
    });
    fixture = TestBed.createComponent(AdminHubActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
