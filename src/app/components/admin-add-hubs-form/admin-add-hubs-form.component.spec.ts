import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddHubsFormComponent } from './admin-add-hubs-form.component';

describe('AdminAddHubsFormComponent', () => {
  let component: AdminAddHubsFormComponent;
  let fixture: ComponentFixture<AdminAddHubsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddHubsFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddHubsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
