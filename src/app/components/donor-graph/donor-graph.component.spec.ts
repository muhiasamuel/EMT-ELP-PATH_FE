import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorGraphComponent } from './donor-graph.component';

describe('DonorGraphComponent', () => {
  let component: DonorGraphComponent;
  let fixture: ComponentFixture<DonorGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonorGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
