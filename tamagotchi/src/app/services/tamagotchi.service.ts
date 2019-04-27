import { Injectable } from '@angular/core';
import { Tamagotchi } from '../models/tamagotchi';
import {TamagotchiStatus} from "../models/TamagotchiStatus";
import { TamagotchiTimerService } from './tamagotchi-timer.service';

@Injectable({
  providedIn: 'root'
})
export class TamagotchiService {
 constructor(){

 }
  private tama: Tamagotchi = new Tamagotchi();

  getStatus(): TamagotchiStatus {
    return this.tama.status;
  }

  getTamagotchi(): Tamagotchi {
    return this.tama;
  }
}
