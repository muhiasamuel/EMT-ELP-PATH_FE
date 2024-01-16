import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarVerificationComponent } from './scholar-verification.component';

describe('ScholarVerificationComponent', () => {
  let component: ScholarVerificationComponent;
  let fixture: ComponentFixture<ScholarVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScholarVerificationComponent]
    });
    fixture = TestBed.createComponent(ScholarVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
