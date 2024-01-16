import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSpoltlightComponent } from './admin-add-spoltlight.component';

describe('AdminAddSpoltlightComponent', () => {
  let component: AdminAddSpoltlightComponent;
  let fixture: ComponentFixture<AdminAddSpoltlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddSpoltlightComponent]
    });
    fixture = TestBed.createComponent(AdminAddSpoltlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
