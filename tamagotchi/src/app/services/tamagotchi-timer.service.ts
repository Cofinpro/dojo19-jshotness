import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { TamagotchiService } from './tamagotchi.service';
import { Tamagotchi } from '../models/tamagotchi';


@Injectable({
  providedIn: 'root'
})
export class TamagotchiTimerService {

  constructor(tamagotchiService : TamagotchiService) {
    console.log("timer");
    timer(0, 1000).subscribe(() => this.tick(tamagotchiService.getTamagotchi()));

  }
tick(tamagotchi : Tamagotchi){
  tamagotchi.saturation-=10;
  tamagotchi.satisfaction_cuddle-=12;
  tamagotchi.satisfaction_love-=11;
  tamagotchi.updateStatus();
  tamagotchi.validate();
}

}
