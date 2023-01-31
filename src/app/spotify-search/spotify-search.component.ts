import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HTMLSTYLE, RESULTDATA } from 'src/assets/interface';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';
import { SpotifyMainComponent } from '../spotify-main/spotify-main.component';
import { SEARCHTOP, TOKENDATA, HTMLBLOCK, HTMLNONE, SEARCHSTYLE } from '../../assets/spotify/spotify-data';
import { AnalyzationService } from '../service/analyzation.service';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent {
  constructor(
    private builder: FormBuilder, 
    private spotifySearchService: AnalyzationService,
    private spotifyAPI: SpotifyApiComponent,
    private apiParent: SpotifyMainComponent
  ){}
  searchTab = SEARCHSTYLE;
  errorStyle = HTMLNONE;
  bodyStyle = HTMLBLOCK;
  searchResult: any[] = []; // 検索結果
  error: string = ''; // error文
  volumeRange: number[] = this.volRange();
  searchMyTop: string[] = SEARCHTOP.name;
  termRange: string[] = SEARCHTOP.term;

  access_token: string | null = TOKENDATA.access_token;
  refresh_token: string | null = TOKENDATA.refresh_token;

  myTop = this.builder.group({
    item: ['artists', Validators.required],
    term: ['Life time', Validators.required],
    volume: [10, Validators.required]
  });

  tracks = this.builder.group({

  });

  recently = this.builder.group({
    volume: [10, Validators.required],
  });

  volRange() : number[] {
    let returnRange: number[] = [];
    for(let i=1; i < 51; i++){
      returnRange.push(i);
    }
    return returnRange;
  }

  searchTop(): void {
    this.searchResult = [];
    const strVolumeRange: string = String(this.myTop.value.volume);
    if(typeof(this.myTop.value.item) === 'string' && typeof(this.myTop.value.term) === 'string' && this.access_token != null){
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
      this.spotifySearchService.getTopRank(this.myTop.value.item, term, strVolumeRange, this.access_token)
      .subscribe({
        next: (data: any) => {
          switch(this.myTop.value.item){
            // アーティスト検索
            case 'artists':
              for(let i=0; i<data['items'].length; i++){
                const aritst_data: RESULTDATA = {
                  display_name: data['items'][i]['name'],
                  ex_url : data['items'][i]['external_urls']['spotify'],
                  img : data['items'][i]['images'][1]['url'],
                  id: String(i),
                  style: {opacity: '0', },
                  hover: false,
                }
                this.searchResult.push(aritst_data);
              }
              break;
            // トラック検索
            case 'tracks':
              for(let i=0; i<data['items'].length; i++){
                const track_data: RESULTDATA = {
                  display_name: data['items'][i]['name'],
                  ex_url : data['items'][i]['external_urls']['spotify'],
                  img : data['items'][i]['album']['images'][1]['url'],
                  id: String(i),
                  style: {opacity: '0', },
                  hover: false,
                }
                this.searchResult.push(track_data);
              }
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
              this.bodyStyle = HTMLNONE;
              this.error = 'エラーが発生しました。管理者へご連絡ください。'
              break;
          }
          console.log('error: ', e);
        }
      });
  
    }
    else{
      this.error = '入力した値が正しくありません。'
      this.errorStyle = HTMLBLOCK;
    }
  }

  searchTracks(): void {
    this.searchResult = [];

  }

  // 最近聞いた曲
  searchRecentlyPlayed(): void {
    this.searchResult = [];
    const strVolumeRange: string = String(this.recently.value.volume);
    if(this.access_token != null && this.recently.value.volume != (undefined && null) && this.recently.value.volume < 51){
      this.spotifySearchService.getRecetlyPlayed(strVolumeRange, this.access_token)
      .subscribe({
        next: (data: any) => {
          for(let i=0; i<data['items'].length; i++){
            let artistsList: string[] = [];
            // アーティスト取得
            for(let j=0; j< data['items'][i]['track']['album']['artists'].length; j++){
              artistsList.push(data['items'][i]['track']['album']['artists'][j]['name']);
            }
            const recently_tracks: RESULTDATA = {
              display_name: data['items'][i]['track']['name'], // track name
              ex_url: '', // url
              id: data['items'][i]['track']['id'], // track id
              img: data['items'][i]['track']['album']['images'][1]['url'],  // トプ画
              hover: false, // ホバー検出
              style: {opacity: '0', }, // ホバー時のグレー
              
              sub_info: String(artistsList), //アーティスト名
            }
            this.searchResult.push(recently_tracks);
          }
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
              this.bodyStyle = HTMLNONE;
              this.error = 'エラーが発生しました。管理者へご連絡ください。'
              break;
          }
          console.log('error: ', e);
        }
      })
    }
    else{
      this.error = '入力した値が正しくありません。'
      this.errorStyle = HTMLBLOCK;
    }
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

  closeError(): void {
    this.errorStyle = HTMLNONE;
    this.bodyStyle = HTMLBLOCK;
  }
}
