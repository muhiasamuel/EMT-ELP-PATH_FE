import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSpotlightDeleteComponent } from './admin-add-spotlight-delete.component';

describe('AdminAddSpotlightDeleteComponent', () => {
  let component: AdminAddSpotlightDeleteComponent;
  let fixture: ComponentFixture<AdminAddSpotlightDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddSpotlightDeleteComponent]
    });
    fixture = TestBed.createComponent(AdminAddSpotlightDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
