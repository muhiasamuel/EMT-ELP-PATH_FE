import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteFormComponent } from './admin-delete-form.component';

describe('AdminDeleteFormComponent', () => {
  let component: AdminDeleteFormComponent;
  let fixture: ComponentFixture<AdminDeleteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeleteFormComponent]
    });
    fixture = TestBed.createComponent(AdminDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
