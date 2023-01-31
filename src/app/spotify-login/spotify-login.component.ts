import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';
import { TOKEN } from 'src/assets/interface';
import { TOKENDATA, HTMLBLOCK, HTMLNONE } from 'src/assets/spotify/spotify-data';


@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent {
  login: any;
  authorizeUrl: string='';


  constructor(
    private spotifyAuthService: AuthorizationService, 
    private spotifyAPI: SpotifyApiComponent,
    private route: ActivatedRoute, 
    private router: Router,
  ){}


  ngOnInit(){
    this.getUrlQuery();
  }

  getUrlQuery(){
    this.route.queryParams.subscribe((query) => {
      if(query['code'] === undefined){
        this.login = HTMLBLOCK;
        this.oAuth();
      }
      else {
        this.login = HTMLNONE;
        this.getAuthorizeCode(query['code']);
      }
    });
  }

  // 認証url作成
  oAuth(): void{
    this.authorizeUrl = this.spotifyAuthService.oAutho();
  }
  // アクセストークン取得
  getAuthorizeCode(code: string){
    this.spotifyAuthService.getAcceseToken(code)
    .subscribe({
      next: (data: any)=>{
        TOKENDATA.access_token = data['access_token'];
        TOKENDATA.refresh_token = data['refresh_token'];
        this.router.navigate(['/spotify-api'], {queryParams: { access_token: TOKENDATA['access_token'], refresh_token: TOKENDATA['refresh_token']} });
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
