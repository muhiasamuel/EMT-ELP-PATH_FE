import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEventFormComponent } from './admin-add-event-form.component';

describe('AdminAddEventFormComponent', () => {
  let component: AdminAddEventFormComponent;
  let fixture: ComponentFixture<AdminAddEventFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddEventFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
