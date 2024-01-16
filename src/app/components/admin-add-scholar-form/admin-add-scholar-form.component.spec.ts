import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddScholarFormComponent } from './admin-add-scholar-form.component';

describe('AdminAddScholarFormComponent', () => {
  let component: AdminAddScholarFormComponent;
  let fixture: ComponentFixture<AdminAddScholarFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddScholarFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddScholarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
