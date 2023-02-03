import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private authorizeEndPoint: string = 'https://accounts.spotify.com/authorize'; // 
  private client_id: string = '482f2f80a66345e4810d441f7f8a0c5a'; // Your client id
  private client_secret: string = '454c5ba931654cdbbbbb6db043a5700f'; // Your secre
  private scopes: string = 'user-read-recently-played user-read-currently-playing user-top-read playlist-read-private playlist-read-collaborative'; // Your scopes

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any) {}
  // 承認コード発行
  public oAutho(): string {
    const baseUrl: string = document.location.origin;
    const redirect_uri = `${baseUrl}/spotify-api/spotify-login`;
    // your application requests authorization
    return `${this.authorizeEndPoint}?client_id=${this.client_id}&redirect_uri=${redirect_uri}&scope=${this.scopes}&response_type=code&show_dialog=true`;
  }

  // アクセストークン取得
  public getAcceseToken(code:string){
    const authorizationTokenUrl: string = `https://accounts.spotify.com/api/token`;
    const baseUrl: string = document.location.origin;
    const redirect_uri: string = `${baseUrl}/spotify-api/spotify-login`;
    const body = `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`;
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
             'Basic  ' + btoa(this.client_id + ':' + this.client_secret),
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }), responseType: 'json'
    });
  }


  // リフレッシュトークン取得
  public getRefreshToken(refresh_token: string){
    const authorizationTokenUrl: string = `https://accounts.spotify.com/api/token`;
    const body = `refresh_token=${refresh_token}&grant_type=refresh_token`;
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
            'Basic  ' + btoa(this.client_id + ':' + this.client_secret),
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }), responseType: 'json', observe: 'body',
    });
  }


}
