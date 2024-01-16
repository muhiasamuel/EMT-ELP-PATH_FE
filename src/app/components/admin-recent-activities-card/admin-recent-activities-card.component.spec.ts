import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecentActivitiesCardComponent } from './admin-recent-activities-card.component';

describe('AdminRecentActivitiesCardComponent', () => {
  let component: AdminRecentActivitiesCardComponent;
  let fixture: ComponentFixture<AdminRecentActivitiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRecentActivitiesCardComponent]
    });
    fixture = TestBed.createComponent(AdminRecentActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
