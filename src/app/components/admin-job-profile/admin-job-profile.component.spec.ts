import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobProfileComponent } from './admin-job-profile.component';

describe('AdminJobProfileComponent', () => {
  let component: AdminJobProfileComponent;
  let fixture: ComponentFixture<AdminJobProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminJobProfileComponent]
    });
    fixture = TestBed.createComponent(AdminJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
