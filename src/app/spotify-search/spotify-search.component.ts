import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ARTISTDATA } from 'src/assets/interface';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';
import { SpotifyMainComponent } from '../spotify-main/spotify-main.component';
import { SEARCHTOP, TERMRANGE } from '../../assets/data';
import { AnalyzationService } from '../service/analyzation.service';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent {
  constructor(private builder: FormBuilder, private spotifySearchService: AnalyzationService, private apiGrandParent: SpotifyApiComponent, private apiParent: SpotifyMainComponent){}
  myTopStyle: any = { display: 'block', }
  tracksStyle: any = { display: 'none', }
  errorStyle: any ={ display: 'none', }
  topSearch: any[] = []; // 
  error: string = ''; // 
  volumeRange: number[] = this.volRange();
  searchMyTop: string[] = SEARCHTOP;
  termRange: string[] = TERMRANGE;
  myTop = this.builder.group({
    item: ['artists', Validators.required],
    term: ['Life time', Validators.required],
    volume: [10, Validators.required]
  });

  volRange() : number[] {
    let returnRange: number[] = [];
    for(let i=1; i < 51; i++){
      returnRange.push(i);
    }
    return returnRange;
  }

  searchTop(): void {
    this.topSearch = [];
    const strVolumeRange: string = String(this.myTop.value.volume);
    if(typeof(this.myTop.value.item) === 'string' && typeof(this.myTop.value.term) === 'string'){
      let term: string = '';
      switch(this.myTop.value.term){
        case '6 months':
          term = 'medium_term';
          break;
        case '1 month':
          term = 'short_term';
          break;
        default:
          term = 'long_term';
          break;
      };
      this.spotifySearchService.getTopRank(this.myTop.value.item, term, strVolumeRange, this.apiGrandParent.accessToken)
      .subscribe({
        next: (data: any) => {
          console.log(data['items']);
          switch(this.myTop.value.item){
            case 'artists':
              for(let i=0; i<data['items'].length; i++){
                const aritst_data: ARTISTDATA = {
                  name: data['items'][i]['name'],
                  ex_url : data['items'][i]['external_urls']['spotify'],
                  img : data['items'][i]['images'][1]['url'],
                  id: String(i),
                  style: {opacity: '0', },
                  hover: false,
                }
                this.topSearch.push(aritst_data);
              }
              break;
            case 'tracks':
              console.log('top tracks');
              break;
            default:
              this.error = '表示するデータがありません。';
              break;
          };
        },
        error: (e) => {
          this.errorStyle = {display : 'block'};
          switch (e.status) {
            case 403:
              this.error = '認証エラーです。code:403';
              break;
            case 401:
              this.error = 'トークンの承認期限切れです。code:401';
              this.apiParent.refreshButton();
              break;
            default:
              this.error = 'エラーが発生しました。管理者へご連絡ください。'
              break;
          }
          console.log('error: ', e);
        }
      });
  
    }
    else  this.error = '入力した値が正しくありません。'
  }

  getTopHoverOn(data:any){
    data.hover = true;
    data.style = {opacity: '1', "background-color":'rgba(0,0,0,0.8)',};
    // console.log(data);
  }
  getTopHoverOff(data: any){
    data.hover = false;
    data.style = {opacity: '0', };
    // console.log(data);
  }
}
