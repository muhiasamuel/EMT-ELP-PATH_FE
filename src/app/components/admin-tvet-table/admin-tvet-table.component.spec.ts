import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTVETTableComponent } from './admin-tvet-table.component';

describe('AdminTVETTableComponent', () => {
  let component: AdminTVETTableComponent;
  let fixture: ComponentFixture<AdminTVETTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTVETTableComponent]
    });
    fixture = TestBed.createComponent(AdminTVETTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
