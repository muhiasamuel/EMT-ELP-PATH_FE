import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsletterFormUpdateComponent } from './admin-newsletter-form-update.component';

describe('AdminNewsletterFormUpdateComponent', () => {
  let component: AdminNewsletterFormUpdateComponent;
  let fixture: ComponentFixture<AdminNewsletterFormUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsletterFormUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminNewsletterFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
