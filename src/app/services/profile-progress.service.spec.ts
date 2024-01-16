import { TestBed } from '@angular/core/testing';

import { ProfileProgressService } from './profile-progress.service';

describe('ProfileProgressService', () => {
  let service: ProfileProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
