import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminFormComponent } from './add-admin-form.component';

describe('AddAdminFormComponent', () => {
  let component: AddAdminFormComponent;
  let fixture: ComponentFixture<AddAdminFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdminFormComponent]
    });
    fixture = TestBed.createComponent(AddAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
