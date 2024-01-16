import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsletterDeleteformComponent } from './admin-newsletter-deleteform.component';

describe('AdminNewsletterDeleteformComponent', () => {
  let component: AdminNewsletterDeleteformComponent;
  let fixture: ComponentFixture<AdminNewsletterDeleteformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsletterDeleteformComponent]
    });
    fixture = TestBed.createComponent(AdminNewsletterDeleteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
