import { Injectable } from '@angular/core';
import { TamagotchiService } from './tamagotchi.service';
import {TamagotchiStatus} from "../models/TamagotchiStatus";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private tama: TamagotchiService) {}

  increaseTamaSaturation() {
    this.tama.getTamagotchi().saturation+= 20;
    this.tama.getTamagotchi().status = TamagotchiStatus.EAT;
  }
}
