import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSchoolFormComponent } from './admin-add-school-form.component';

describe('AdminAddSchoolFormComponent', () => {
  let component: AdminAddSchoolFormComponent;
  let fixture: ComponentFixture<AdminAddSchoolFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddSchoolFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddSchoolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
