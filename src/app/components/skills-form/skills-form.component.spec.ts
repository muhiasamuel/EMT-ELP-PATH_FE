import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsFormComponent } from './skills-form.component';

describe('SkillsFormComponent', () => {
  let component: SkillsFormComponent;
  let fixture: ComponentFixture<SkillsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsFormComponent]
    });
    fixture = TestBed.createComponent(SkillsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
