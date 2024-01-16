import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsUdatePutformComponent } from './admin-news-udate-putform.component';

describe('AdminNewsUdatePutformComponent', () => {
  let component: AdminNewsUdatePutformComponent;
  let fixture: ComponentFixture<AdminNewsUdatePutformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsUdatePutformComponent]
    });
    fixture = TestBed.createComponent(AdminNewsUdatePutformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
