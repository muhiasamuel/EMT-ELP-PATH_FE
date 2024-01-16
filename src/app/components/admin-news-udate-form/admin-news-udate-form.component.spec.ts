import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsUdateFormComponent } from './admin-news-udate-form.component';

describe('AdminNewsUdateFormComponent', () => {
  let component: AdminNewsUdateFormComponent;
  let fixture: ComponentFixture<AdminNewsUdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsUdateFormComponent]
    });
    fixture = TestBed.createComponent(AdminNewsUdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
