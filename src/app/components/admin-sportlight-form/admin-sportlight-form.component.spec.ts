import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSportlightFormComponent } from './admin-sportlight-form.component';

describe('AdminSportlightFormComponent', () => {
  let component: AdminSportlightFormComponent;
  let fixture: ComponentFixture<AdminSportlightFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSportlightFormComponent]
    });
    fixture = TestBed.createComponent(AdminSportlightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
