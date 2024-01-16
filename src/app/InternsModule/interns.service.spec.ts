import { TestBed } from '@angular/core/testing';

import { InternsService } from './interns.service';

describe('InternsService', () => {
  let service: InternsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
