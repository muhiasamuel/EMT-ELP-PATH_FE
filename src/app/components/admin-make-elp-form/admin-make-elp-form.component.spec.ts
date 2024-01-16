import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMakeElpFormComponent } from './admin-make-elp-form.component';

describe('AdminMakeElpFormComponent', () => {
  let component: AdminMakeElpFormComponent;
  let fixture: ComponentFixture<AdminMakeElpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMakeElpFormComponent]
    });
    fixture = TestBed.createComponent(AdminMakeElpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
