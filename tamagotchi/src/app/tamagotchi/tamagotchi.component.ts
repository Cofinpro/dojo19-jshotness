import { Component, OnInit, OnChanges } from '@angular/core';
import { Tamagotchi } from "../models/tamagotchi";
import { TamagotchiStatus } from "../models/TamagotchiStatus";

import { TamagotchiService } from '../services/tamagotchi.service';

@Component({
  selector: 'app-tamagotchi',
  templateUrl: './tamagotchi.component.html',
  styleUrls: ['./tamagotchi.component.css']
})

export class TamagotchiComponent implements OnInit, OnChanges {


  public tama : Tamagotchi;

  constructor(private tamagotchi: TamagotchiService) {
    
  }

  ngOnInit(): void {
    this.tama = this.tamagotchi.getTamagotchi();
  }

  ngOnChanges(): void {
    console.log("Änderung wurde vorgenommen")
  }

  getStatus() {
    return this.tamagotchi.getStatus();

  }
  changeGif(): void {
    this.tama.status = TamagotchiStatus.DANCE;


  }
}
