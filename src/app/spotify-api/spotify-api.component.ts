import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TOKENDATA } from 'src/assets/spotify/spotify-data';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-spotify-api',
  templateUrl: './spotify-api.component.html',
  styleUrls: ['./spotify-api.component.css']
})
export class SpotifyApiComponent {
  constructor(private spotifyService: AuthorizationService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.checkToken();
  }

  checkToken(): void {
    const accessToken = TOKENDATA.access_token;
    const refreshToken = TOKENDATA.refresh_token;
    switch(typeof(accessToken)){
      case 'string':
        this.router.navigateByUrl('/spotify-api/spotify-main');
        break;
      default:
        this.router.navigateByUrl('/spotify-api/spotify-login');
        break;
    }
  }
}