import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterEventsCardComponent } from './admin-chapter-events-card.component';

describe('AdminChapterEventsCardComponent', () => {
  let component: AdminChapterEventsCardComponent;
  let fixture: ComponentFixture<AdminChapterEventsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChapterEventsCardComponent]
    });
    fixture = TestBed.createComponent(AdminChapterEventsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
