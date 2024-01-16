import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMenuHomeComponent } from './side-bar-menu-home.component';

describe('SideBarMenuHomeComponent', () => {
  let component: SideBarMenuHomeComponent;
  let fixture: ComponentFixture<SideBarMenuHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarMenuHomeComponent]
    });
    fixture = TestBed.createComponent(SideBarMenuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
