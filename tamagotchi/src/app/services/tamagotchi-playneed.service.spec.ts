import { TestBed } from '@angular/core/testing';

import { TamagotchiPlayneedService } from './tamagotchi-playneed.service';

describe('TamagotchiPlayneedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TamagotchiPlayneedService = TestBed.get(TamagotchiPlayneedService);
    expect(service).toBeTruthy();
  });
});
