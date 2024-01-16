import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAwardingStatusGraphComponent } from './admin-awarding-status-graph.component';

describe('AdminAwardingStatusGraphComponent', () => {
  let component: AdminAwardingStatusGraphComponent;
  let fixture: ComponentFixture<AdminAwardingStatusGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAwardingStatusGraphComponent]
    });
    fixture = TestBed.createComponent(AdminAwardingStatusGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
