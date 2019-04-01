import {Injectable, Output} from '@angular/core';
import Song from "./models/Song";
import {SongsService} from "./songs.service";
import {Howl} from 'howler';


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

  playSong(s) {
    if (this.playing) {
      this.song.stop();
      this.song.unload();
    }
    this.setSong(s);
    this.playing = true;
    this.song.play();
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
  }

}
