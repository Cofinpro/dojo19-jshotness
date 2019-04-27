import { Component, OnInit } from '@angular/core';
import { InteractService } from '../services/interact.service';
import { TamagotchiStatus } from '../models/TamagotchiStatus';

@Component({
  selector: 'app-ui-cuddle',
  templateUrl: './ui-cuddle.component.html',
  styleUrls: ['./ui-cuddle.component.css']
})
export class UiCuddleComponent implements OnInit {

  constructor(public interactService : InteractService) { }

  ngOnInit() {
  }

  public onCuddle(event) {  
    this.interactService.cuddle();
  }

}
