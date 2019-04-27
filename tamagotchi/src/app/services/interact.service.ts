import { Injectable } from '@angular/core';
import { Tamagotchi } from '../models/tamagotchi';
import { TamagotchiStatus } from '../models/TamagotchiStatus';

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  private tamagotchi : Tamagotchi;

  constructor() { }

  registerTamagotchi(tamagotchi : Tamagotchi) : void {
    this.tamagotchi = tamagotchi;
  }

  public cuddle() : void {
    console.log("cuddle value : " + this.tamagotchi.satisfaction_cuddle);
    this.tamagotchi.satisfaction_cuddle += 10;
    console.log("cuddle value : " + this.tamagotchi.satisfaction_cuddle);
    if (this.tamagotchi.satisfaction_cuddle > 90) {
      this.tamagotchi.status = TamagotchiStatus.CUDDLE;
    }
  }

  public getTamagotchi() : Tamagotchi {
    return this.tamagotchi;
  }
}
