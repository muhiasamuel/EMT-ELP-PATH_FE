import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubProfileComponent } from './admin-hub-profile.component';

describe('AdminHubProfileComponent', () => {
  let component: AdminHubProfileComponent;
  let fixture: ComponentFixture<AdminHubProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubProfileComponent]
    });
    fixture = TestBed.createComponent(AdminHubProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
