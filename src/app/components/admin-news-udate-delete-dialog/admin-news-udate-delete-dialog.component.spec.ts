import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsUdateDeleteDialogComponent } from './admin-news-udate-delete-dialog.component';

describe('AdminNewsUdateDeleteDialogComponent', () => {
  let component: AdminNewsUdateDeleteDialogComponent;
  let fixture: ComponentFixture<AdminNewsUdateDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewsUdateDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(AdminNewsUdateDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
