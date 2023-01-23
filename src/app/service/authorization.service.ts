import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Event, NavigationEnd, RouterEvent, Router, ActivatedRoute } from '@angular/router';

import { bufferCount } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  // private searchUrl: string;
  // private redirect_uri:string;
  private client_id: string = '482f2f80a66345e4810d441f7f8a0c5a'; // Your client id
  private client_secret: string = '454c5ba931654cdbbbbb6db043a5700f'; // Your secre
  // private access_token:string;
  // private encoded = btoa(this.client_id + ':' + this.client_secret);
  private scopes: string = 'user-read-private user-read-email user-library-read playlist-read user-read-recently-played user-top-read'; // Your scopes
  private redirect_uri: string = '';


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any) {
    console.log(this.document.baseURI);
    // filter((e: Event): e is DocumentEvent)
    // this.router.events.pipe(
    //   filter((e: Event): e is RouterEvent => e instanceof NavigationEnd)
    // ).subscribe((e: RouterEvent) => {
    //   Do something
    //   console.log(e);
    // });
    // this.route.params.subscribe((params) => console.log(params));

    this.route.queryParamMap
    // .filter(params=> params.order)
    .subscribe(params => {
      console.log(params.keys.toString());
      // this.orderObj = { ...params.keys, ...params };
    });
   }

   ngOnInit(){

    // console.log(this.router.url);

   }

  // public login() {
  //     const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
  //     const params = 'grant_type=client_credentials'; // client_credentials -> ok
  //     const encoded = btoa(this.client_id + ':' + this.client_secret);
  //     return this.http.post(authorizationTokenUrl, params, /*{headers : head} */{
  //       headers: new HttpHeaders ({
  //         Authorization: 'Basic ' + encoded,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       })
  //     });
  // }


  public login() {
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, {
        headers: new HttpHeaders({
            Authorization:
                'Basic  ' + btoa(this.client_id + ':' + this.client_secret),
            'Content-Type': 'application/x-www-form-urlencoded;',
        }),
        observe: 'body',
        responseType: 'text',
    });
}
  public oAutho() {
    // this.document.location.href = 'http://google.com';
    // this.document.location.search = {order: '1'};
    // this.document.location.assign(`https://accounts.spotify.com/authorize?`, {queryParams:})
    // const url = this.document; // 'https://google.com'
    // console.log(url);

    // const authorizationTokenUrl = `https://accounts.spotify.com/authorize?`;
    // const body = 'grant_type=authorization_code';
    // return this.http.get(authorizationTokenUrl, {
    //   params:{
    //     response_type: 'code',
    //     client_id: '482f2f80a66345e4810d441f7f8a0c5a',
    //     scope: 'user-read-private user-read-email user-library-read playlist-read user-read-recently-played user-top-read',
    //     redirect_uri: `http://localhost:4200/spotify-api/callback`
    //     // state: state
    //   }
    // })
  }

  // this.http.login().subscribe(data=>{

  // });
}
