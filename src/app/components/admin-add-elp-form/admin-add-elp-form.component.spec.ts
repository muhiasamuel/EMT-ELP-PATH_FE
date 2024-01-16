import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddElpFormComponent } from './admin-add-elp-form.component';

describe('AdminAddElpFormComponent', () => {
  let component: AdminAddElpFormComponent;
  let fixture: ComponentFixture<AdminAddElpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddElpFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddElpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
