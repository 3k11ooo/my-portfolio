import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  accessToken?: string;
  refreshToken?: string;
  // topSearch: any[] = [];

  constructor(private spotifyService: AuthorizationService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.getQuery();

  }

  getQuery(){
    this.route.queryParams.subscribe((data: any) => {
      const aToken: string = data['access_token'];
      const rToken: string = data['refresh_token'];
      switch(aToken != undefined){
        case true:
          this.accessToken = aToken;
          this.refreshToken = rToken;
          this.router.navigate(['/spotify-api/spotify-main'], { queryParams: data});
          break;
        default:
          this.router.navigateByUrl('/spotify-api/spotify-login');
          break;
      }
    });
  }
}