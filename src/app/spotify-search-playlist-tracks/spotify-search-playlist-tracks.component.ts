import { Component } from '@angular/core';
import { SpotifySearchComponent } from '../spotify-search/spotify-search.component';
import { TRACKS_IN_PLAYLIST } from 'src/assets/interface';

@Component({
  selector: 'app-spotify-search-playlist-tracks',
  templateUrl: './spotify-search-playlist-tracks.component.html',
  styleUrls: ['./spotify-search-playlist-tracks.component.css']
})
export class SpotifySearchPlaylistTracksComponent {
  constructor(private parentCom: SpotifySearchComponent){}
  resultArray: TRACKS_IN_PLAYLIST[] = this.parentCom.songsDataInPlaylist;
}
