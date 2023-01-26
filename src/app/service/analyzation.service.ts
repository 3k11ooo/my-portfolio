import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { end } from '@popperjs/core';


@Injectable({
  providedIn: 'root'
})
export class AnalyzationService {

  constructor(private http: HttpClient) { }

  // ランキング(アーティスト、楽曲)を取得する
  public getTopRank(tagType: string, term: string, trackNum: string, access_token?: string){
    const endPoint : string =`https://api.spotify.com/v1/me/top/${tagType}?time_range=${term}&limit=${trackNum}`;
    //"https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0"
    return this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization:
            'Bearer ' + access_token,
        // 'Content-Type': 'application/json;',
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    });
  }
  // ユーザー情報取得
  public getMyInfos(access_token?: string){
    const endPoint = 'https://api.spotify.com/v1/me';
    return this.http.get(endPoint, {
      headers: new HttpHeaders({
        Authorization:
            'Bearer ' + access_token,
        // 'Content-Type': 'application/json;',
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    });
  }
}
