import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScholarsTableComponent } from './admin-scholars-table.component';

describe('AdminScholarsTableComponent', () => {
  let component: AdminScholarsTableComponent;
  let fixture: ComponentFixture<AdminScholarsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminScholarsTableComponent]
    });
    fixture = TestBed.createComponent(AdminScholarsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
