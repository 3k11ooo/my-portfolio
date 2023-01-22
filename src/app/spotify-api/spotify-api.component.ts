import { Component } from '@angular/core';
import { AuthorizationService } from '../service/authorization.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spotify-api',
  templateUrl: './spotify-api.component.html',
  styleUrls: ['./spotify-api.component.css']
})
export class SpotifyApiComponent {
  accessToken: string='';
  tokenType:string='';

  constructor(private spotifyService: AuthorizationService){}

  login(){
    this.spotifyService.login()
    .subscribe(data => {
      console.log(data);
      // this.accessToken = data['access_token'];
      // this.tokenType = data['token_type'];
    },
    // error =>{
    //   console.error(error);
    // }
    );
  }
  auth(){
    this.spotifyService.oAutho();
    //.subscribe({})
    // .subscribe(data => {
    //   console.log(data);
    // })
  }


}

/*

      .subscribe(data => {
        console.log(data);
        // this.accessToken = data['access_token'];
        // this.tokenType = data['token_type'];
      });
      */
