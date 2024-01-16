import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationFormComponent } from './otp-verification-form.component';

describe('OtpVerificationFormComponent', () => {
  let component: OtpVerificationFormComponent;
  let fixture: ComponentFixture<OtpVerificationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpVerificationFormComponent]
    });
    fixture = TestBed.createComponent(OtpVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
