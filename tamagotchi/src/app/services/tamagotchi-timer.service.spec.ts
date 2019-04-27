import { TestBed } from '@angular/core/testing';

import { TamagotchiTimerService } from './tamagotchi-timer.service';

describe('TamagotchiTimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TamagotchiTimerService = TestBed.get(TamagotchiTimerService);
    expect(service).toBeTruthy();
  });
});
