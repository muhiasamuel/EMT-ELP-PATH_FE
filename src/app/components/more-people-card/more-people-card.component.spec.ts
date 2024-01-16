import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePeopleCardComponent } from './more-people-card.component';

describe('MorePeopleCardComponent', () => {
  let component: MorePeopleCardComponent;
  let fixture: ComponentFixture<MorePeopleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MorePeopleCardComponent]
    });
    fixture = TestBed.createComponent(MorePeopleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
