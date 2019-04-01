import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MusicPlayer';
  songs: object = [
    {
      "id": 0,
      "title": "Wild Horses",
      "artist": "Bishop Briggs",
      "length": 0,
      "fileName": "Bishop Briggs - Wild Horses.wav"
    },
    {
      "id": 1,
      "title": "",
      "artist": "",
      "length": 0
    },
    {
      "id": 2,
      "title": "",
      "artist": "",
      "length": 0
    },
    {
      "id": 3,
      "title": "",
      "artist": "",
      "length": 0
    }
  ]
  ;
}
