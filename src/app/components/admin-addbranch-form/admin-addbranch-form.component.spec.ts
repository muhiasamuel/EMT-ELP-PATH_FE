import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddbranchFormComponent } from './admin-addbranch-form.component';

describe('AdminAddbranchFormComponent', () => {
  let component: AdminAddbranchFormComponent;
  let fixture: ComponentFixture<AdminAddbranchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddbranchFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddbranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
