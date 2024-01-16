import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsHomeComponent } from './admin-events-home.component';

describe('AdminEventsHomeComponent', () => {
  let component: AdminEventsHomeComponent;
  let fixture: ComponentFixture<AdminEventsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEventsHomeComponent]
    });
    fixture = TestBed.createComponent(AdminEventsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
