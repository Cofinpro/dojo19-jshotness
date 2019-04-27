import { Component, OnInit, Host } from '@angular/core';
import { AppComponent } from '../app.component';
import { FeedService } from '../services/feed.service';
//import {TamagotchiComponent} form '../tamagotchi/tamagotchi.component';

@Component({
  selector: 'app-ui-feed',
  templateUrl: './ui-feed.component.html',
  styleUrls: ['./ui-feed.component.css']
})
export class UiFeedComponent implements OnInit {

  constructor( @Host() private parent: AppComponent, private feedservice : FeedService) { }

  ngOnInit() {
  }

  feed_click() {
    console.log("geklickt");
    this.feedservice.increaseTamaSaturation();
    }
  }


