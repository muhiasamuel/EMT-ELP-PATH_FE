import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchChampionCardComponent } from './admin-branch-champion-card.component';

describe('AdminBranchChampionCardComponent', () => {
  let component: AdminBranchChampionCardComponent;
  let fixture: ComponentFixture<AdminBranchChampionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBranchChampionCardComponent]
    });
    fixture = TestBed.createComponent(AdminBranchChampionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
