import { TestBed } from '@angular/core/testing';

import { CuddleService } from './cuddle.service';

describe('CuddleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuddleService = TestBed.get(CuddleService);
    expect(service).toBeTruthy();
  });
});
