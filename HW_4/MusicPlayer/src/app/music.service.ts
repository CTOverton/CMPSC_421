import {Injectable, Output} from '@angular/core';
import Song from "./models/Song";
import {SongsService} from "./songs.service";
import {Howl} from 'howler';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  playing: boolean;

  song: any;
  songInfo: Song;
  songs: Song[] = [];

  constructor(private songService: SongsService) {
    this.songInfo = {
      artist: "No Artist",
      fileName: "",
      id: 0,
      length: "",
      title: "No Title"
    };
  }

  // Observable string sources
  private playPauseBtn = new Subject<any>();

  // Observable string streams
  playPauseBtn$ = this.playPauseBtn.asObservable();

  init() {
    let that = this;
    this.songService.fetchData()
      .subscribe(function(d) {
        that.songs = d as Song[]
      });
  }

  getSong() {
    return this.song;
  }

  setSong(s) {
    this.song = new Howl({
      src: ['assets/music/' + this.songs[s.id].fileName]
    });
    this.setSongInfo(s);
  }

  getSongInfo() {
    console.log('Getting')
    if (this.songInfo == undefined) {
      return {
        "id": 0,
        "title": "",
        "artist": "",
        "length": "",
        "fileName": ""
      }
    }
    return this.songInfo;
  }

  setSongInfo(s) {
    this.songInfo.id = s.id;
    this.songInfo.title = s.title;
    this.songInfo.artist = s.artist;
    this.songInfo.length = s.length;
    this.songInfo.fileName = s.fileName;
  }

  updatePlayPauseBtn() {
    if (this.playing) {
      this.playPauseBtn.next('pause_circle_outline');
    } else {
      this.playPauseBtn.next('play_circle_outline')
    }
  }

  playSong(s) {
    if (this.playing) {
      this.song.stop();
      this.song.unload();
    }
    this.setSong(s);
    this.playing = true;
    this.song.play();
    this.updatePlayPauseBtn();
  }

  playPause() {
    if (this.playing) {
      this.song.pause();
      this.playing = false;
    } else {
      if (this.song == undefined) {
        this.song = new Howl({
          src: ['assets/music/' + this.songs[0].fileName]
        });
        this.setSongInfo(this.songs[0]);
      }
      this.song.play();
      this.playing = true;
    }
    this.updatePlayPauseBtn();
  }

  skip(direction: string) {
    let songID = 0;
    if (direction == 'prev') {
      let index = this.songInfo.id - 1;
      if (index < 0) {
        songID = this.songs.length - 1;
      } else if (index >= 0 && index < this.songs.length) {
        songID = index;
      }
    } else {
      let index = this.songInfo.id + 1;
      if (index > 0 && index < this.songs.length) {
        songID = index;
      }
    }
    this.playSong(this.songs[songID]);
  }
}
