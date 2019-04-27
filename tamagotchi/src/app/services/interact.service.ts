import { Injectable } from '@angular/core';
import { Tamagotchi } from '../models/tamagotchi';
import { TamagotchiStatus } from '../models/TamagotchiStatus';
import { TamagotchiService } from './tamagotchi.service';

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  private tamagotchi : Tamagotchi;

  constructor(tamagotchiService: TamagotchiService) {
    this.tamagotchi = tamagotchiService.getTamagotchi();
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
