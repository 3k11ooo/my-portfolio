import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyzationService } from '../service/analyzation.service';
import { ARTISTDATA, USERINFO } from 'src/assets/interface';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';

@Component({
  selector: 'app-spotify-main',
  templateUrl: './spotify-main.component.html',
  styleUrls: ['./spotify-main.component.css']
})
export class SpotifyMainComponent {
  // access_token
  topSearch: any[] = [];
  myInfo: USERINFO = {
    name: '',
    img: '',
  };

  constructor(private spotifyAnaService: AnalyzationService, private apiMother: SpotifyApiComponent, private route: ActivatedRoute){}

  ngOninit(){

  }


  getTopTracks() :void{
    this.topSearch = [];
    const searchItems: string = 'artists';
    this.spotifyAnaService.getTopRank(searchItems, 'long_term', '10', this.apiMother.accessToken)
    .subscribe({
      next: (data: any) => {
        console.log(data['items']);
        for(let i=0; i<data['items'].length; i++){
          const aritst_data: ARTISTDATA = {
            ex_url : data['items'][i]['external_urls']['spotify'],
            img : data['items'][i]['images'][1]['url'],
            id: data['items'][i]['name'],
          }
          this.topSearch.push(aritst_data);
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

  getMe(): void{
    this.spotifyAnaService.getMyInfos(this.apiMother.accessToken)
    .subscribe({
      next: (data: any) => {
        this.myInfo = {
          name: data['display_name'],
          img: data['images']['url']
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
