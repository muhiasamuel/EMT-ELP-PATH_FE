import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorDonorsGraphComponent } from './minor-donors-graph.component';

describe('MinorDonorsGraphComponent', () => {
  let component: MinorDonorsGraphComponent;
  let fixture: ComponentFixture<MinorDonorsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinorDonorsGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinorDonorsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
