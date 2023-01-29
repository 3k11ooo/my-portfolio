import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TOKENDATA } from 'src/assets/data';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-spotify-api',
  templateUrl: './spotify-api.component.html',
  styleUrls: ['./spotify-api.component.css']
})
export class SpotifyApiComponent {
  // token: any;
  // login: any;
  // authorizeUrl: string ='';
  accessToken: string | null = TOKENDATA.access_token;
  refreshToken: string | null = TOKENDATA.access_token;
  // topSearch: any[] = [];

  constructor(private spotifyService: AuthorizationService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.checkToken();
  }

  checkToken(): void {
    switch(this.accessToken){
      case 'string':
        this.router.navigate(['/spotify-api/spotify-main'], {queryParams: { access_token: TOKENDATA.access_token, refresh_token: TOKENDATA.refresh_token}});
        break;
      default:
        this.router.navigateByUrl('/spotify-api/spotify-login');
        break;
    }
  }
}