import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHubleaderCardComponent } from './admin-hubleader-card.component';

describe('AdminHubleaderCardComponent', () => {
  let component: AdminHubleaderCardComponent;
  let fixture: ComponentFixture<AdminHubleaderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHubleaderCardComponent]
    });
    fixture = TestBed.createComponent(AdminHubleaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
