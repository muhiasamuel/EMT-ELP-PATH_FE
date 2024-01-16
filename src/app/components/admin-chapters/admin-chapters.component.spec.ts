import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChaptersComponent } from './admin-chapters.component';

describe('AdminChaptersComponent', () => {
  let component: AdminChaptersComponent;
  let fixture: ComponentFixture<AdminChaptersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChaptersComponent]
    });
    fixture = TestBed.createComponent(AdminChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
