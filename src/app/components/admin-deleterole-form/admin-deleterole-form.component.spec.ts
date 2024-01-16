import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteroleFormComponent } from './admin-deleterole-form.component';

describe('AdminDeleteroleFormComponent', () => {
  let component: AdminDeleteroleFormComponent;
  let fixture: ComponentFixture<AdminDeleteroleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeleteroleFormComponent]
    });
    fixture = TestBed.createComponent(AdminDeleteroleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
