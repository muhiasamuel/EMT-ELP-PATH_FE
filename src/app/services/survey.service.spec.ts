import { TestBed } from '@angular/core/testing';

import { surveyService } from './survey.service';

describe('SurveyService', () => {
  let service: surveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(surveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
