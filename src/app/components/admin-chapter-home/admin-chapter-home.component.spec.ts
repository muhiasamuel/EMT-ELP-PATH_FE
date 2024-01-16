import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterHomeComponent } from './admin-chapter-home.component';

describe('AdminChapterHomeComponent', () => {
  let component: AdminChapterHomeComponent;
  let fixture: ComponentFixture<AdminChapterHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChapterHomeComponent]
    });
    fixture = TestBed.createComponent(AdminChapterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
