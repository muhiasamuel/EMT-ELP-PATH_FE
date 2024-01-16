import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubHomeComponent } from './admin-hub-home.component';

describe('AdminHubHomeComponent', () => {
  let component: AdminHubHomeComponent;
  let fixture: ComponentFixture<AdminHubHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubHomeComponent]
    });
    fixture = TestBed.createComponent(AdminHubHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
