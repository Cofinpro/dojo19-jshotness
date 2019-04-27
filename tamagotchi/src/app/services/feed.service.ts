import { Injectable } from '@angular/core';
import {TamagotchiComponent} from '../tamagotchi/tamagotchi.component';
import { Tamagotchi } from '../models/tamagotchi';
import {TamagotchiStatus} from '../models/TamagotchiStatus';
import { TamagotchiService } from './tamagotchi.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private tama: TamagotchiService) { }

  increaseTamaSaturation() {
    this.tama.getTamagotchi().saturation+= 50;
  }
}
