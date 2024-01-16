import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubEventsCardComponent } from './admin-hub-events-card.component';

describe('AdminHubEventsCardComponent', () => {
  let component: AdminHubEventsCardComponent;
  let fixture: ComponentFixture<AdminHubEventsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubEventsCardComponent]
    });
    fixture = TestBed.createComponent(AdminHubEventsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
