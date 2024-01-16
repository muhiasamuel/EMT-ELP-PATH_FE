import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobcardListComponent } from './admin-jobcard-list.component';

describe('AdminJobcardListComponent', () => {
  let component: AdminJobcardListComponent;
  let fixture: ComponentFixture<AdminJobcardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminJobcardListComponent]
    });
    fixture = TestBed.createComponent(AdminJobcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
