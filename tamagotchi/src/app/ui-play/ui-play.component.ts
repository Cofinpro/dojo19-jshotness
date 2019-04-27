import { Component, OnInit } from '@angular/core';
import {TamagotchiService} from "../services/tamagotchi.service";
import {Tamagotchi} from "../models/tamagotchi";
import {TamagotchiStatus} from "../models/TamagotchiStatus";

@Component({
  selector: 'app-ui-play',
  templateUrl: './ui-play.component.html',
  styleUrls: ['./ui-play.component.css']
})
export class UiPlayComponent implements OnInit {

  tama : Tamagotchi;
  constructor(private tamagotchiService: TamagotchiService) {
    this.tama =this.tamagotchiService.getTamagotchi();
  }

  ngOnInit() {
  }

  play(){
    console.log("Play Button wurde aufgerufen");
    this.tama.satisfaction_love+=10;
    if (this.tama.satisfaction_love>80){
      this.tama.status = TamagotchiStatus.PLAY;
    }
  }
}
