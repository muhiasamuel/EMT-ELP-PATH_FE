import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationRejecformComponent } from './admin-application-rejecform.component';

describe('AdminApplicationRejecformComponent', () => {
  let component: AdminApplicationRejecformComponent;
  let fixture: ComponentFixture<AdminApplicationRejecformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApplicationRejecformComponent]
    });
    fixture = TestBed.createComponent(AdminApplicationRejecformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
