import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from 'src/assets/spotify/spotify-data';

@Injectable({
  providedIn: 'root'
})
export class AnalyzationService {

  constructor(private http: HttpClient) { }

  // ランキング(アーティスト、楽曲)を取得する
  public getTopRank(tagType: string, term: string, trackNum: string, access_token?: string){
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

  private test_boolean: boolean = false; 
  // observable test
  public getData(access_token: string | null): any {
    const endPoint = 'https://api.spotify.com/v1/me';
    const num = 2;
    const user_data: any = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.getMyInfos(access_token));
        observer.next(this.data(5));
        observer.next(this.data(num));
        //observer.next(this.data_data());
        observer.complete();
      }, 3000);
    });
    return user_data;
  }
  private data(num: number): number {
    if(num === 2) {this.test_boolean = true; return 3;}
    else {this.test_boolean = false; return 6;}
  }
  private data_data(): void {
    console.log('data_data => ',this.test_boolean);
  }
  // test api
  public testGetMyInfo(access_token: string | null): Observable<object>{
    // let result: any;
    const endPoint = 'https://api.spotify.com/v1/me';
    return this.http.get<object>(endPoint, {
      headers: new HttpHeaders({
        Authorization:
            'Bearer ' + access_token,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      responseType: 'json',
      observe: 'body'
    });
    // return 'hello';
    // return result;
  }





  // ユーザー情報取得
  public getMyInfos(access_token: string | null): any {
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
        user.user_name = data['display_name'];
        user.user_id = data['id'];
        user.access_token = access_token;
      },
      error: (error) => {
        user.error = true;
      }
    })
    return user;
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
  public getPlaylistData(access_token: string, user_name: string, usr_id:string): any {
    const endPoint = `https://api.spotify.com/v1/users/${usr_id}/playlists?limit=10`;
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