import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TamagotchiComponent } from './tamagotchi/tamagotchi.component';
import { UiFeedComponent } from './ui-feed/ui-feed.component';
import { UiPlayComponent } from './ui-play/ui-play.component';
import { UiCuddleComponent } from './ui-cuddle/ui-cuddle.component';
import { InteractService } from './services/interact.service';
import { FeedService } from './services/feed.service';
import { TamagotchiService } from './services/tamagotchi.service';
import { TamagotchiHungryService } from './services/tamagotchi-hungry.service';
import { TamagotchiCuddleneedService } from './services/tamagotchi-cuddleneed.service';
import { TamagotchiPlayneedService } from './services/tamagotchi-playneed.service';

@NgModule({
  declarations: [
    AppComponent,
    TamagotchiComponent,
    UiFeedComponent,
    UiPlayComponent,
    UiCuddleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [InteractService, FeedService, TamagotchiService, TamagotchiHungryService, TamagotchiCuddleneedService, TamagotchiPlayneedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
