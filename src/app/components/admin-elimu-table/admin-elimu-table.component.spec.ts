import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminElimuTableComponent } from './admin-elimu-table.component';

describe('AdminElimuTableComponent', () => {
  let component: AdminElimuTableComponent;
  let fixture: ComponentFixture<AdminElimuTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminElimuTableComponent]
    });
    fixture = TestBed.createComponent(AdminElimuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
