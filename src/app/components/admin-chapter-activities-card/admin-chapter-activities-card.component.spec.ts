import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterActivitiesCardComponent } from './admin-chapter-activities-card.component';

describe('AdminChapterActivitiesCardComponent', () => {
  let component: AdminChapterActivitiesCardComponent;
  let fixture: ComponentFixture<AdminChapterActivitiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChapterActivitiesCardComponent]
    });
    fixture = TestBed.createComponent(AdminChapterActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
