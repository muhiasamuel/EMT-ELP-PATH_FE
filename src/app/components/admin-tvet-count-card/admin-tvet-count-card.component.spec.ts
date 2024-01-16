import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTvetCountCardComponent } from './admin-tvet-count-card.component';

describe('AdminTvetCountCardComponent', () => {
  let component: AdminTvetCountCardComponent;
  let fixture: ComponentFixture<AdminTvetCountCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTvetCountCardComponent]
    });
    fixture = TestBed.createComponent(AdminTvetCountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
