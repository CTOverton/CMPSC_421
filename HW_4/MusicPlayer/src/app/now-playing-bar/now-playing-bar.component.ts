import {Component, Input, OnInit} from '@angular/core';
import {Howl} from 'howler';
import Song from "../models/Song"
import {SongsService} from "../songs.service";
import {MusicService} from "../music.service";

@Component({
  selector: 'app-now-playing-bar',
  templateUrl: './now-playing-bar.component.html',
  styleUrls: ['./now-playing-bar.component.css']
})
export class NowPlayingBarComponent implements OnInit {

  isActive: boolean;
  progress: number = 10;
  song: any = this.musicService.getSong();
  songInfo: Song;

  constructor(private songService: SongsService, private musicService: MusicService) {
    this.songInfo = musicService.songInfo;
  }

  ngOnInit() {
    this.musicService.init();
  }

  playPause() {
    this.musicService.playPause();
    console.log(this)
  }

  mousedown() {
    this.isActive = true;
    window.addEventListener('mousemove', this.moveplayhead, true);
    window.addEventListener('mouseup', (event) => this.mouseUp(this, event), true);
  }

  moveplayhead(e) {
    e.preventDefault();
    let mouse = e.clientX;
    let bar = document.getElementsByClassName('progress');
    let box = bar[0].getBoundingClientRect();

    if (mouse < box.left) {
      this.progress = 0;
    } else if (mouse > box.left && mouse < box.right) {
      this.progress = ((mouse - box.left) / (box.right - box.left)) * 100;
    } else if (mouse > box.right) {
      this.progress = 100;
    }
  }

  mouseUp(self, $event: Event) {
    if (self.isActive == true) {
      self.moveplayhead($event);
      window.removeEventListener('mousemove', self.moveplayhead, true);
    }
    self.isActive = false;
  }
}
