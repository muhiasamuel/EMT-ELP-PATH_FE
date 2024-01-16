import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterleaderCardComponent } from './admin-chapterleader-card.component';

describe('AdminChapterleaderCardComponent', () => {
  let component: AdminChapterleaderCardComponent;
  let fixture: ComponentFixture<AdminChapterleaderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChapterleaderCardComponent]
    });
    fixture = TestBed.createComponent(AdminChapterleaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
