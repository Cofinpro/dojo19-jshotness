import { Injectable } from '@angular/core';
import { Tamagotchi } from '../models/tamagotchi';
import {TamagotchiStatus} from "../models/TamagotchiStatus";

@Injectable({
  providedIn: 'root'
})
export class TamagotchiService {

  private tama: Tamagotchi = new Tamagotchi();

  getStatus(): TamagotchiStatus {
    return this.tama.status;
  }

  getTamagotchi(): Tamagotchi {
    return this.tama;
  }
}
