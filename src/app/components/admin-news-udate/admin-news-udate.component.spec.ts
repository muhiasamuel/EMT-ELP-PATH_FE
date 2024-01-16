import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsUdateComponent } from './admin-news-udate.component';

describe('AdminNewsUdateComponent', () => {
  let component: AdminNewsUdateComponent;
  let fixture: ComponentFixture<AdminNewsUdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsUdateComponent]
    });
    fixture = TestBed.createComponent(AdminNewsUdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
