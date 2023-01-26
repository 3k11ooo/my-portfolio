import { Component } from '@angular/core';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent {

  topStyle: any = {
    display: 'block',
  }
  tracksStyle: any = {
    display: 'none',
  }

}
