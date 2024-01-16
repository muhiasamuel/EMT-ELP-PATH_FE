import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotlightSourceComponent } from './spotlight-source.component';

describe('SpotlightSourceComponent', () => {
  let component: SpotlightSourceComponent;
  let fixture: ComponentFixture<SpotlightSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotlightSourceComponent]
    });
    fixture = TestBed.createComponent(SpotlightSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
