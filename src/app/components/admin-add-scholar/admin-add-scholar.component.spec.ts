import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddScholarComponent } from './admin-add-scholar.component';

describe('AdminAddScholarComponent', () => {
  let component: AdminAddScholarComponent;
  let fixture: ComponentFixture<AdminAddScholarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddScholarComponent]
    });
    fixture = TestBed.createComponent(AdminAddScholarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
