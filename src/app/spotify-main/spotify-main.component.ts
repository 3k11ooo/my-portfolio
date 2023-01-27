import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';
import { AnalyzationService } from '../service/analyzation.service';
import { SPOTIFYAPISEARCH } from 'src/assets/data';
import { ARTISTDATA, USERINFO, APISEARH } from 'src/assets/interface';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';
import { SpotifySearchComponent } from '../spotify-search/spotify-search.component';

@Component({
  selector: 'app-spotify-main',
  templateUrl: './spotify-main.component.html',
  styleUrls: ['./spotify-main.component.css']
})
export class SpotifyMainComponent {
  @ViewChild(SpotifySearchComponent) protected apiChild!: SpotifySearchComponent;

  topSearch: any[] = [];
  myInfo: USERINFO = {
    name: '',
    img: '',
  };
  refreshStyle: any = { display: 'none', };
  error: string = '';
  search_api = SPOTIFYAPISEARCH;
  


  constructor(private spotifyAuthService: AuthorizationService, private spotifyAnaService: AnalyzationService, private apiParent: SpotifyApiComponent/*, private apiChild: SpotifySearchComponent*/, private route: ActivatedRoute, private router: Router){}

  ngOninit(){

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
    this.refreshStyle = { diplay: 'block' };
  }

  getRefreshToken(): void{
    this.route.queryParams.subscribe((data: any) => {
      this.spotifyAuthService.getRefreshToken(data['refresh_token'])
      .subscribe({
        next: (data: any)=>{
          console.log(data);
          this.apiParent.accessToken = data['access_token']; // 親の変数に格納
          this.apiParent.refreshToken = data['refresh_token']; // 親の変数に格納
          this.router.navigate(['/spotify-api/spotify-main'], {queryParams: { access_token: data['access_token'], refresh_token: data['refresh_token']}});
        },
        error: (e)=> {
          switch (e.status) {
            default:
              console.log('error: ', e);
              break;
          }
        }
      });
    });
  }
}
