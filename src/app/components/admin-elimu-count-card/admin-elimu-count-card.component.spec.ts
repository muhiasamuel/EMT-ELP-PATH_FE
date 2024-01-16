import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminElimuCountCardComponent } from './admin-elimu-count-card.component';

describe('AdminElimuCountCardComponent', () => {
  let component: AdminElimuCountCardComponent;
  let fixture: ComponentFixture<AdminElimuCountCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminElimuCountCardComponent]
    });
    fixture = TestBed.createComponent(AdminElimuCountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
