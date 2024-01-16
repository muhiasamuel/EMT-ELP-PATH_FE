import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubsComponent } from './admin-hubs.component';

describe('AdminHubsComponent', () => {
  let component: AdminHubsComponent;
  let fixture: ComponentFixture<AdminHubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubsComponent]
    });
    fixture = TestBed.createComponent(AdminHubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
