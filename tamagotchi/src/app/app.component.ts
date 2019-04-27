import { Component } from '@angular/core';
import { TamagotchiTimerService } from './services/tamagotchi-timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (timerservice : TamagotchiTimerService){
    
  }
  title = 'Tamagotchi-Monster-App';
}
