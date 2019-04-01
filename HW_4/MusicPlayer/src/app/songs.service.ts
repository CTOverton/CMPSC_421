import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http: HttpClient) { }

  songsUrl = 'assets/music/musicInfo.json';

  fetchData() {
    return this.http.get(this.songsUrl);
  }
}
