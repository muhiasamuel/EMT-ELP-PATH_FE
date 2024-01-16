import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserfeebackComponent } from './admin-userfeeback.component';

describe('AdminUserfeebackComponent', () => {
  let component: AdminUserfeebackComponent;
  let fixture: ComponentFixture<AdminUserfeebackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserfeebackComponent]
    });
    fixture = TestBed.createComponent(AdminUserfeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
