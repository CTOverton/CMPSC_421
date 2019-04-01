import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { NowPlayingBarComponent } from './now-playing-bar/now-playing-bar.component';

import { MusicService } from "./music.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    NowPlayingBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ MusicService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
