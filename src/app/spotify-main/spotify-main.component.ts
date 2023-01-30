import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';
import { SPOTIFYAPISEARCHSTYLE, TOKENDATA, HTMLBLOCK, HTMLNONE } from 'src/assets/spotify/spotify-data';
import { HTMLSTYLE } from 'src/assets/interface';

@Component({
  selector: 'app-spotify-main',
  templateUrl: './spotify-main.component.html',
  styleUrls: ['./spotify-main.component.css']
})
export class SpotifyMainComponent {

  topSearch: any[] = [];
  refreshStyle = HTMLNONE;
  error: string = '';
  search_api = SPOTIFYAPISEARCHSTYLE;
  access_token: string | null = TOKENDATA.access_token;
  refresh_token: string | null = TOKENDATA.refresh_token;
  
  constructor(
    private spotifyAuthService: AuthorizationService, 
  ){}

  ngOnInit(): void{
  }


  navSwitch(nav:string){
    for(let i=0; i<this.search_api.length; i++){
      if(nav == this.search_api[i].val){
        this.search_api[i].active = 'active';
        this.search_api[i].page = 'page';
      }
      else{
        this.search_api[i].active = '';
        this.search_api[i].page = '';
      }
    }
  }
  
  refreshButton(): void{
    this.refreshStyle = HTMLBLOCK;
  }

  getRefreshToken(): void{
    if(this.refresh_token != null){
      this.spotifyAuthService.getRefreshToken(this.refresh_token)
      .subscribe({
        next: (data: any)=>{
          TOKENDATA.access_token = data['access_token']; // dataに格納
          TOKENDATA.refresh_token = data['refresh_token']; // dataに格納
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
    else this.error = 'トークンエラーです。管理者にご連絡ください。'
  }
}
