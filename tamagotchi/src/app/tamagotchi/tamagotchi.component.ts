import {Component, OnInit} from '@angular/core';
import {Tamagotchi} from "../models/tamagotchi";
import {TamagotchiStatus} from "../models/TamagotchiStatus";
import { InteractService } from '../services/interact.service';

@Component({
  selector: 'app-tamagotchi',
  templateUrl: './tamagotchi.component.html',
  styleUrls: ['./tamagotchi.component.css']
})
export class TamagotchiComponent implements OnInit {


  constructor(private interactService : InteractService) {
    this.interactService.registerTamagotchi(this.tama);
  }

  tama: Tamagotchi = {
    saturation : 45,
    satisfaction_cuddle : 60,
    satisfaction_love : 30,
    status : TamagotchiStatus.HAPPY
  };

  ngOnInit() {
  
  }

  changeGif() : void {
    this.tama.status = TamagotchiStatus.DANCE;
  }

}
