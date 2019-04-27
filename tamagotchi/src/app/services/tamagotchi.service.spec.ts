import { TestBed } from '@angular/core/testing';

import { TamagotchiService } from './tamagotchi.service';

describe('TamagotchiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TamagotchiService = TestBed.get(TamagotchiService);
    expect(service).toBeTruthy();
  });
});
