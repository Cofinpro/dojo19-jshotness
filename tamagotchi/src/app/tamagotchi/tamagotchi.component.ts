import {Component, OnInit} from '@angular/core';
import {Tamagotchi} from "../models/tamagotchi";
import {TamagotchiStatus} from "../models/TamagotchiStatus";
import { TamagotchiService } from '../services/tamagotchi.service';

@Component({
  selector: 'app-tamagotchi',
  templateUrl: './tamagotchi.component.html',
  styleUrls: ['./tamagotchi.component.css']
})

export class TamagotchiComponent implements OnInit {

  public tama;

  constructor(private tamagotchi :TamagotchiService) { }

  ngOnInit(): void {
    this.tama = this.tamagotchi.getTamagotchi();
  }

  getStatus(){
    return this.tamagotchi.getStatus();
  }
}
