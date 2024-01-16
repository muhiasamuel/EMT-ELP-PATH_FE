import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterActivitiesComponent } from './admin-chapter-activities.component';

describe('AdminChapterActivitiesComponent', () => {
  let component: AdminChapterActivitiesComponent;
  let fixture: ComponentFixture<AdminChapterActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChapterActivitiesComponent]
    });
    fixture = TestBed.createComponent(AdminChapterActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
