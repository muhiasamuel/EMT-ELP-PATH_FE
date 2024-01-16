import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddChaptersFormComponent } from './admin-add-chapters-form.component';

describe('AdminAddChaptersFormComponent', () => {
  let component: AdminAddChaptersFormComponent;
  let fixture: ComponentFixture<AdminAddChaptersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddChaptersFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddChaptersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
