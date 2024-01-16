import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTotalGlobalscholarsCardComponent } from './admin-total-globalscholars-card.component';

describe('AdminTotalGlobalscholarsCardComponent', () => {
  let component: AdminTotalGlobalscholarsCardComponent;
  let fixture: ComponentFixture<AdminTotalGlobalscholarsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTotalGlobalscholarsCardComponent]
    });
    fixture = TestBed.createComponent(AdminTotalGlobalscholarsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
