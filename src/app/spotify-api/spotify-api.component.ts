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
  token: any;
  login: any;
  authorizeUrl: string ='';
  accessToken?: string;
  refreshToken?: string;
  topSearch: any[] = [];

  constructor(private spotifyService: AuthorizationService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.getUrlQuery();
  }

  getUrlQuery() : void{
    this.route.queryParams.subscribe((query) => {
      if(query['code'] === undefined){
        this.login = {
          display: 'block'
        };
        this.oAuth();
      }
      else {
        this.login = {
          display: 'none'
        };
        this.getAuthorizeCode(query['code']);
      }
    });
  }

  // 認証url作成
  oAuth(): void{
    this.authorizeUrl = this.spotifyService.oAutho();
  }
  // アクセストークン取得
  getAuthorizeCode(code: string): void{
    this.spotifyService.getAcceseToken(code)
    .subscribe({
      next: (data: any)=>{
        this.accessToken = data['access_token']; // 親の変数に格納
        this.refreshToken = data['refresh_token']; // 親の変数に格納
        // this.router.navigateByUrl('/all-products/spotify-api');
      },
      error: (e)=> {
        switch (e.status) {
          default:
            console.log('error: ', e);
            break;
        }
      }
    });
  }


  getTopTracks() :void{
    this.spotifyService.getTopTracks('artists', 'short_term', '10', this.accessToken)
    .subscribe({
      next: (data: any) => {
        for(let i=0; i<data['items'].length; i++){
          this.topSearch.push(data['items'][i]['name']);
          // console.log(data['items'][i]['name']);
        }
      },
      error: (e) => {
        switch (e.status) {
          default:
            console.log('error: ', e);
            break;
        }
      }
    });
  }

}