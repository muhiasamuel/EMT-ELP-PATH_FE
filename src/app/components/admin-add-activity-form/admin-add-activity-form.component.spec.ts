import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddActivityFormComponent } from './admin-add-activity-form.component';

describe('AdminAddActivityFormComponent', () => {
  let component: AdminAddActivityFormComponent;
  let fixture: ComponentFixture<AdminAddActivityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddActivityFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
