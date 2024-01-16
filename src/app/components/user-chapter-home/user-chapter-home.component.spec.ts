import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChapterHomeComponent } from './user-chapter-home.component';

describe('UserChapterHomeComponent', () => {
  let component: UserChapterHomeComponent;
  let fixture: ComponentFixture<UserChapterHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserChapterHomeComponent]
    });
    fixture = TestBed.createComponent(UserChapterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
