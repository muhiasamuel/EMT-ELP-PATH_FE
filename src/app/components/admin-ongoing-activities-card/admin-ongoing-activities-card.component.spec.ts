import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOngoingActivitiesCardComponent } from './admin-ongoing-activities-card.component';

describe('AdminOngoingActivitiesCardComponent', () => {
  let component: AdminOngoingActivitiesCardComponent;
  let fixture: ComponentFixture<AdminOngoingActivitiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOngoingActivitiesCardComponent]
    });
    fixture = TestBed.createComponent(AdminOngoingActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
