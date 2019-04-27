import { TestBed } from '@angular/core/testing';

import { TamagotchiHungryService } from './tamagotchi-hungry.service';

describe('TamagotchiHungryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TamagotchiHungryService = TestBed.get(TamagotchiHungryService);
    expect(service).toBeTruthy();
  });
});
