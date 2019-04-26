import {Component, OnInit} from '@angular/core';
import {Tamagotchi} from "../models/tamagotchi";
import {TamagotchiStatus} from "../models/TamagotchiStatus";

@Component({
  selector: 'app-tamagotchi',
  templateUrl: './tamagotchi.component.html',
  styleUrls: ['./tamagotchi.component.css']
})
export class TamagotchiComponent implements OnInit {

  constructor() { }

  tama: Tamagotchi = {
    saturation : 45,
    satisfaction_cuddle : 60, satisfaction_love : 30, status :TamagotchiStatus.Happy};

  getStatusEnumName() : string {
    return TamagotchiStatus[this.tama.status];
  }

  ngOnInit() {
  }

}
