import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScholargenderGraphComponent } from './admin-scholargender-graph.component';

describe('AdminScholargenderGraphComponent', () => {
  let component: AdminScholargenderGraphComponent;
  let fixture: ComponentFixture<AdminScholargenderGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminScholargenderGraphComponent]
    });
    fixture = TestBed.createComponent(AdminScholargenderGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
