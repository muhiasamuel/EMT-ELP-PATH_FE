import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddOrganizationFormComponent } from './admin-add-organization-form.component';

describe('AdminAddOrganizationFormComponent', () => {
  let component: AdminAddOrganizationFormComponent;
  let fixture: ComponentFixture<AdminAddOrganizationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddOrganizationFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddOrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
