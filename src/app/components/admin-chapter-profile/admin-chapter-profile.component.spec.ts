import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterProfileComponent } from './admin-chapter-profile.component';

describe('AdminChapterProfileComponent', () => {
  let component: AdminChapterProfileComponent;
  let fixture: ComponentFixture<AdminChapterProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChapterProfileComponent]
    });
    fixture = TestBed.createComponent(AdminChapterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
