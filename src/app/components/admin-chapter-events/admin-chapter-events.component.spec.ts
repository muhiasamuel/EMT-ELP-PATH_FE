import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterEventsComponent } from './admin-chapter-events.component';

describe('AdminChapterEventsComponent', () => {
  let component: AdminChapterEventsComponent;
  let fixture: ComponentFixture<AdminChapterEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChapterEventsComponent]
    });
    fixture = TestBed.createComponent(AdminChapterEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
