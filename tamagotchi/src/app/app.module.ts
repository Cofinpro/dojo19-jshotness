import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TamagotchiComponent } from './tamagotchi/tamagotchi.component';
import { UiFeedComponent } from './ui-feed/ui-feed.component';
import { UiPlayComponent } from './ui-play/ui-play.component';
import { UiCuddleComponent } from './ui-cuddle/ui-cuddle.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
