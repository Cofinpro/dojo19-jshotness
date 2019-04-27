import { Injectable } from '@angular/core';
import { TamagotchiService } from './tamagotchi.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private tama: TamagotchiService) { }

  increaseTamaSaturation() {
    this.tama.getTamagotchi().saturation+= 20;
  }
}
