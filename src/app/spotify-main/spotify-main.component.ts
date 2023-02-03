import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';
import { SPOTIFYAPISEARCHSTYLE, TOKENDATA, HTMLBLOCK, HTMLNONE, SEARCHSTYLE } from 'src/assets/spotify/spotify-data';
import { HTMLSTYLE } from 'src/assets/interface';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';
import { SpotifySearchComponent } from '../spotify-search/spotify-search.component';
import { query } from '@angular/animations';

@Component({
  selector: 'app-spotify-main',
  templateUrl: './spotify-main.component.html',
  styleUrls: ['./spotify-main.component.css']
})
export class SpotifyMainComponent {
  @ViewChild(SpotifySearchComponent) child!: SpotifySearchComponent;
  topSearch: any[] = [];
  refreshStyle = HTMLNONE;
  error: string = '';
  search_api = SPOTIFYAPISEARCHSTYLE;
  tabStyle = SEARCHSTYLE;
  access_token: string | null = TOKENDATA.access_token;
  refresh_token: string | null = TOKENDATA.refresh_token;
  
  constructor(
    private spotifyAuthService: AuthorizationService, 
    private spotifyAPI: SpotifyApiComponent,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void{
  }


  navSwitch(nav:string){
    this.child.searchResult = [];
    for(let i=0; i<this.search_api.length; i++){
      if(nav == this.search_api[i].val){
        this.search_api[i].active = 'active';
        this.search_api[i].page = 'page';
        this.tabStyle[i] = HTMLBLOCK;
      }
      else{
        this.search_api[i].active = '';
        this.search_api[i].page = '';
        this.tabStyle[i] = HTMLNONE;
      }
    }
  }
  
  refreshButton(): void{
    this.refreshStyle = HTMLBLOCK;
  }

  async getRefreshToken(): Promise<void>{
    await this.getQueryCode();
    if(TOKENDATA.refresh_token != null){
      this.spotifyAuthService.getRefreshToken(TOKENDATA.refresh_token)
      .subscribe({
        next: (data: any)=>{
          // console.log('get refreshtoken', data);
          TOKENDATA.access_token = data['access_token']; // dataに格納
          TOKENDATA.refresh_token = data['refresh_token']; // dataに格納
          this.router.navigate(['/spotify-api/spotify-main'], {queryParams: {access_token: TOKENDATA.access_token, refresh_token: TOKENDATA.refresh_token}});
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

  async getQueryCode(): Promise<void> {
    this.route.queryParams
    .subscribe((query:any) => TOKENDATA.refresh_token = query['refresh_token']);
  }
}
