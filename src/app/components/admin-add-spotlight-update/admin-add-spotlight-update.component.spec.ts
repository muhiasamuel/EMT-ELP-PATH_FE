import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSpotlightUpdateComponent } from './admin-add-spotlight-update.component';

describe('AdminAddSpotlightUpdateComponent', () => {
  let component: AdminAddSpotlightUpdateComponent;
  let fixture: ComponentFixture<AdminAddSpotlightUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddSpotlightUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminAddSpotlightUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
