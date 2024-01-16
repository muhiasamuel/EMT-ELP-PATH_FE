import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddJobUpdateComponent } from './admin-add-job-update.component';

describe('AdminAddJobUpdateComponent', () => {
  let component: AdminAddJobUpdateComponent;
  let fixture: ComponentFixture<AdminAddJobUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddJobUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminAddJobUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
