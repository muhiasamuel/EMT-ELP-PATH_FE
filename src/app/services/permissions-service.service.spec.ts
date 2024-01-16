import { TestBed } from '@angular/core/testing';

import { PermissionsServiceService } from './permissions-service.service';

describe('PermissionsServiceService', () => {
  let service: PermissionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
