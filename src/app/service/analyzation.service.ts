import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USERDATA } from 'src/assets/spotify/spotify-data';
import { PLAYLIST } from 'src/assets/interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyzationService {

  constructor(private http: HttpClient) { }

  // ランキング(アーティスト、楽曲)を取得する
  public getTopRank(tagType: string, term: string, trackNum: string, access_token: string){
    const endPoint : string =`https://api.spotify.com/v1/me/top/${tagType}?time_range=${term}&limit=${trackNum}`;
    return this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization:
            'Bearer ' + access_token,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    });
  }

  // ユーザー情報取得
  public getMyInfos(access_token: string | null, refresh_token: string | null): any {
    const endPoint = 'https://api.spotify.com/v1/me';
    this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization:
            'Bearer ' + access_token,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    })
    .subscribe({
      next: (data:any) => {
        USERDATA.user_name = data['display_name'];
        USERDATA.user_id = data['id'];
        USERDATA.user_img = data['images'][0]['url'];
        USERDATA.error = false;
      },
      error: () => {
        USERDATA.error = true;
      }
    })
    return USERDATA;
  }


  // 最近聞いた曲
  public getRecetlyPlayed(limit: string, access_token?: string): Observable<any> {
    const endPoint = `https://api.spotify.com/v1/me/player/recently-played/?limit=${limit}`;
    return this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization:
            'Bearer ' + access_token,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body',
    });
  }

  // プレイリストデータ取得
  public getPlaylistData(access_token: string, user_name: string, usr_id:string, limit: number) {
    const endPoint = `https://api.spotify.com/v1/users/${usr_id}/playlists?limit=${limit}`;
    return this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + access_token,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    })
  }

  // プレイリストの曲のデータ
  public getSongsDataInPlaylist(endPoint: string, access_token: string) {
    return this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + access_token,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    })
  }

  // データ
  public getTrackData(id:string, access_token: string) {
    const endPoint: string = `https://api.spotify.com/v1/audio-features/${id}`;
    return this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + access_token,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    })
  }
}