import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePostComponent } from './people-post.component';

describe('PeoplePostComponent', () => {
  let component: PeoplePostComponent;
  let fixture: ComponentFixture<PeoplePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeoplePostComponent]
    });
    fixture = TestBed.createComponent(PeoplePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
