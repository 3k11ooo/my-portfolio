import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';


@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent {
  login: any;
  authorizeUrl: string='';

  constructor(private spotifyService: AuthorizationService, private route: ActivatedRoute, private spotifyMain: SpotifyApiComponent, private router: Router){}


  ngOnInit(){
    this.getUrlQuery();
    // this.oAuth(); // create authorize url
  }

  getUrlQuery(){
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
  getAuthorizeCode(code: string){
    this.spotifyService.getAcceseToken(code)
    .subscribe({
      next: (data: any)=>{
        this.spotifyMain.accessToken = data['access_token']; // 親の変数に格納
        this.spotifyMain.refreshToken = data['refresh_token']; // 親の変数に格納
        //this.router.navigateByUrl('/all-products/spotify-api');
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
}