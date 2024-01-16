import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuperadminCardComponent } from './admin-superadmin-card.component';

describe('AdminSuperadminCardComponent', () => {
  let component: AdminSuperadminCardComponent;
  let fixture: ComponentFixture<AdminSuperadminCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSuperadminCardComponent]
    });
    fixture = TestBed.createComponent(AdminSuperadminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
