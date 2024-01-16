import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegionalChaptersComponent } from './admin-regional-chapters.component';

describe('AdminRegionalChaptersComponent', () => {
  let component: AdminRegionalChaptersComponent;
  let fixture: ComponentFixture<AdminRegionalChaptersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRegionalChaptersComponent]
    });
    fixture = TestBed.createComponent(AdminRegionalChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
