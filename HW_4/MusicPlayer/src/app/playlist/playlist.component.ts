import { Component, OnInit } from '@angular/core';
import Song from "../models/Song"
import { SongsService } from "../songs.service";
import { NowPlayingBarComponent } from "../now-playing-bar/now-playing-bar.component"
import { MusicService } from "../music.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers:[ NowPlayingBarComponent ],
})
export class PlaylistComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService : SongsService, private musicService : MusicService) { }

  ngOnInit() {
    this.songService.fetchData()
      .subscribe(d => this.songs = d as Song[]);
  }

  songdlbClicked(s) {
    this.musicService.playSong(s);
  }

}
