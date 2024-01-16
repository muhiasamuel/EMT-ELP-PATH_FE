import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationAwardformComponent } from './admin-application-awardform.component';

describe('AdminApplicationAwardformComponent', () => {
  let component: AdminApplicationAwardformComponent;
  let fixture: ComponentFixture<AdminApplicationAwardformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApplicationAwardformComponent]
    });
    fixture = TestBed.createComponent(AdminApplicationAwardformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
