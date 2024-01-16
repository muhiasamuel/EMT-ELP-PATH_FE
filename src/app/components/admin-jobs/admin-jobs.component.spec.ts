import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobsComponent } from './admin-jobs.component';

describe('AdminJobsComponent', () => {
  let component: AdminJobsComponent;
  let fixture: ComponentFixture<AdminJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminJobsComponent]
    });
    fixture = TestBed.createComponent(AdminJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
