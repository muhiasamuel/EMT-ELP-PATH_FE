import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubEventsComponent } from './admin-hub-events.component';

describe('AdminHubEventsComponent', () => {
  let component: AdminHubEventsComponent;
  let fixture: ComponentFixture<AdminHubEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubEventsComponent]
    });
    fixture = TestBed.createComponent(AdminHubEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
