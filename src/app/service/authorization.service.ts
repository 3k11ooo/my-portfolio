import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Event, NavigationEnd, RouterEvent, Router, ActivatedRoute } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, filter, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private authorizeEndPoint: string = 'https://accounts.spotify.com/authorize'; // 
  private client_id: string = '482f2f80a66345e4810d441f7f8a0c5a'; // Your client id
  private client_secret: string = '454c5ba931654cdbbbbb6db043a5700f'; // Your secre
  private scopes: string = 'user-read-private user-read-email user-library-read playlist-read user-read-recently-played user-top-read'; // Your scopes


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any) {}

  public oAutho(): string {
    const baseUrl: string = document.location.origin;
    const redirect_uri = `${baseUrl}/spotify-api/spotify-login`;
    // your application requests authorization
    return `${this.authorizeEndPoint}?client_id=${this.client_id}&redirect_uri=${redirect_uri}&scope=${this.scopes}&response_type=code&show_dialog=true`;
  }

  public getAcceseToken(code:string){
    const authorizationTokenUrl: string = `https://accounts.spotify.com/api/token`;
    const baseUrl: string = document.location.origin;
    const redirect_uri: string = `${baseUrl}/spotify-api/spotify-login`;
    const body = `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`;
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
            'Basic  ' + btoa(this.client_id + ':' + this.client_secret),
        // 'Content-Type': 'application/json;',
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
      }), responseType: 'json'
    });
  }

  // public getTopTracks(tagType: string, term: string, trackNum: string, access_token?: string){
  //   const endPoint : string =`https://api.spotify.com/v1/me/top/${tagType}?time_range=${term}&limit=${trackNum}`;
  //   // const 
  //   //"https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0"
  //   return this.http.get(endPoint, {
  //     headers: new HttpHeaders({
  //       Authorization:
  //           'Bearer ' + access_token,
  //       // 'Content-Type': 'application/json;',
  //       'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
  //     }),
  //     responseType: 'json',
  //     observe: 'body'
  //   });
  // }
}
