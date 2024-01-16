import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternsHomeComponent } from './interns-home.component';

describe('InternsHomeComponent', () => {
  let component: InternsHomeComponent;
  let fixture: ComponentFixture<InternsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
