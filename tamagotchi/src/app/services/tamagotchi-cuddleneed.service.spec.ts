import { TestBed } from '@angular/core/testing';

import { TamagotchiCuddleneedService } from './tamagotchi-cuddleneed.service';

describe('TamagotchiCuddleneedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TamagotchiCuddleneedService = TestBed.get(TamagotchiCuddleneedService);
    expect(service).toBeTruthy();
  });
});
