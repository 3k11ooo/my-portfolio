import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HTMLSTYLE, PLAYLIST, RESULTDATA, TRACKS_IN_PLAYLIST } from 'src/assets/interface';
import { SpotifyApiComponent } from '../spotify-api/spotify-api.component';
import { SpotifyMainComponent } from '../spotify-main/spotify-main.component';
import { SEARCHTOP, TOKENDATA, HTMLBLOCK, HTMLNONE, SEARCHSTYLE, USERDATA, HTMLGRID, HTMLTABLE } from '../../assets/spotify/spotify-data';
import { AnalyzationService } from '../service/analyzation.service';
import { AsynchronousService } from '../service/asynchronous.service';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent {
  constructor(
    private AsynService: AsynchronousService,
    private builder: FormBuilder, 
    private spotifySearchService: AnalyzationService,
    private spotifyAPI: SpotifyApiComponent,
    private apiParent: SpotifyMainComponent
  ){}
  searchTab = this.apiParent.search_api;
  errorStyle = HTMLNONE;
  bodyStyle = HTMLBLOCK;
  playlistDataStyle: HTMLSTYLE = HTMLNONE;
  playlistTableStyle: HTMLSTYLE = HTMLTABLE;
  tableStyleComment: string = 'Close';
  tracksDataPlaylist: HTMLSTYLE = HTMLNONE;
  searchResult: any[] = []; // 検索結果
  songsDataInPlaylist: TRACKS_IN_PLAYLIST[] = [];
  error: string = ''; // error文
  volumeRange: number[] = this.volRange();
  searchMyTop: string[] = SEARCHTOP.name;
  termRange: string[] = SEARCHTOP.term;
  loading: boolean = false;
  playlistTitle: string = '';

  access_token: string | null = TOKENDATA.access_token;
  refresh_token: string | null = TOKENDATA.refresh_token;

  async ngOnInit() : Promise<void> {
    const myData = await this.spotifySearchService.getMyInfos(this.access_token!, this.refresh_token!);
    if(myData.error == true){
      this.error = 'トークンの承認期限切れです。code:401';
      this.apiParent.refreshButton();
    }
  }

  //トップ検索のフォーム
  myTop = this.builder.group({
    item: ['artists', Validators.required],
    term: ['Life time', Validators.required],
    volume: [10, Validators.required]
  });

  // 曲検索のフォーム
  tracks = this.builder.group({

  });

  // 最近聞いた曲のフォーム
  recently = this.builder.group({
    volume: [10, Validators.required],
  });

  // プレイリストのフォーム
  playlist = this.builder.group({
    volume: [50, Validators.required],
  })

  volRange() : number[] {
    let returnRange: number[] = [];
    for(let i=1; i < 51; i++){
      returnRange.push(i);
    }
    return returnRange;
  }

  // topdata
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

  // 曲検索
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
              ex_url: data['items'][i]['track']['external_urls']['spotify'], // url
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
          console.log('error: ', e.error);
        }
      })
    }
    else{
      this.error = '入力した値が正しくありません。'
      this.errorStyle = HTMLBLOCK;
    }
  }

  // プレイリスト取得 フォーム
  searchPlaylistData(): void { // ボタンが押された
    this.searchResult = [];
    if(this.access_token != null && this.playlist.value.volume != (undefined && null) && (this.playlist.value.volume < 51 && this.playlist.value.volume > 0)){
      this.spotifySearchService.getPlaylistData(this.access_token!, USERDATA.user_name!, USERDATA.user_id!, this.playlist.value.volume)
      .subscribe({
        next: (data: any) => {
          for(let i=0; i<data['items'].length; i++){
            const playlist_data: PLAYLIST = {
              name: data['items'][i]['name'],
              user_name: data['items'][i]['owner']['display_name'],
              id: data['items'][i]['id'],
              img_url: data['items'][i]['images'][0]['url'],
              url: data['items'][i]['external_urls']['spotify'],
              tracks_endpoint: data['items'][i]['tracks']['href']
            }
            this.searchResult.push(playlist_data);
          }
          this.playlistDataStyle = HTMLGRID;
        },
        error: (e: any) => {
          switch(e['state']){
            default:
              console.log(e['error']);
              break;
          }
        }
      });
      // console.log(this.searchResult);
    }
    else{
      this.error = '入力した値が正しくありません。'
      this.errorStyle = HTMLBLOCK;
    }
    // 画面を消す
    //完了したら描画
    // console.log();
  }
  // プレイリスト内容取得
  searchPlaylistSongs(endPoint: string, playlistData: PLAYLIST): void {
    this.playlistTitle = playlistData.name;
    this.songsDataInPlaylist = [];
    endPoint += '?fields=items(track(id%2C%20name%2C%20popularity%2C%20album(images)))';
    if(this.access_token != null) {
      this.spotifySearchService.getSongsDataInPlaylist(endPoint, this.access_token)
      .subscribe({
        next: (data: any) => {
          for(let i=0; i<data['items'].length; i++){
            const gen: string[] = [];
            // for(let j=0; j<data['items'][i]['track']['album']['genres'].length; j++) {
            //   gen.push(data['items'][i]['track']['album']['genres'][j]);
            // }
            const track_id: string = data['items'][i]['track']['id'];
            const track_name: string = data['items'][i]['track']['name'];
            const pop: number = data['items'][i]['track']['popularity'];
            const img: string = data['items'][i]['track']['album']['images'][0]['url'];
            if(track_id != null && this.access_token != null) {
              console.log('yes');
              this.spotifySearchService.getTrackData(track_id, this.access_token) 
              .subscribe({
                next: (response: any) => {
                  const trackData: TRACKS_IN_PLAYLIST = {
                    playlist_data: playlistData,
                    track_name: track_name,
                    popularity: pop,
                    genres: gen,
                    acousticness: response['acousticness'],
                    danceability: response['danceability'],
                    energy: response['energy'],
                    key: response['key'],
                    tempo: response['tempo'],
                    valence: response['valence'],
                    track_image: img,
                  }
                  this.songsDataInPlaylist.push(trackData);
                },
                error: (e: any) => {
                  switch(e['state']){
                    default:
                      console.log(e['error']);
                      break;
                  }
                }
              })
            }
          }
          // console.log(this.songsDataInPlaylist);
          this.tracksDataPlaylist = HTMLBLOCK;
        },
        error: (e: any) => {
          switch(e['state']){
            default:
              console.log(e['error']);
              break;
          }
        }
      })
    }
  }

  switchTableStyle(){
    if(this.playlistTableStyle == HTMLNONE) {
      this.playlistTableStyle = HTMLTABLE;
      this.tableStyleComment = 'Close'
    }
    else {
      this.playlistTableStyle = HTMLNONE;
      this.tableStyleComment = 'Open';
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
