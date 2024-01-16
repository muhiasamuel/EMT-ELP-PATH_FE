import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddjobFormComponent } from './admin-addjob-form.component';

describe('AdminAddjobFormComponent', () => {
  let component: AdminAddjobFormComponent;
  let fixture: ComponentFixture<AdminAddjobFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddjobFormComponent]
    });
    fixture = TestBed.createComponent(AdminAddjobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
