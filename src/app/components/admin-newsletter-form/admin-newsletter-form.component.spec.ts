import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsletterFormComponent } from './admin-newsletter-form.component';

describe('AdminNewsletterFormComponent', () => {
  let component: AdminNewsletterFormComponent;
  let fixture: ComponentFixture<AdminNewsletterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsletterFormComponent]
    });
    fixture = TestBed.createComponent(AdminNewsletterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
