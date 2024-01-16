import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRolesFormComponent } from './admin-add-roles-form.component';

describe('AdminAddRolesFormComponent', () => {
  let component: AdminAddRolesFormComponent;
  let fixture: ComponentFixture<AdminAddRolesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddRolesFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
