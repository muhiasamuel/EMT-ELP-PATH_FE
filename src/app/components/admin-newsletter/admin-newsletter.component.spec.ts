import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsletterComponent } from './admin-newsletter.component';

describe('AdminNewsletterComponent', () => {
  let component: AdminNewsletterComponent;
  let fixture: ComponentFixture<AdminNewsletterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsletterComponent]
    });
    fixture = TestBed.createComponent(AdminNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
