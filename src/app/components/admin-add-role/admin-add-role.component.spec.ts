import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRoleComponent } from './admin-add-role.component';

describe('AdminAddRoleComponent', () => {
  let component: AdminAddRoleComponent;
  let fixture: ComponentFixture<AdminAddRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddRoleComponent]
    });
    fixture = TestBed.createComponent(AdminAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
