import { TestBed } from '@angular/core/testing';

import { ExpirationTokenService } from './expiration-token.service';

describe('ExpirationTokenService', () => {
  let service: ExpirationTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpirationTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
