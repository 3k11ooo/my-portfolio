import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TOKENDATA } from 'src/assets/spotify/spotify-data';

@Component({
  selector: 'app-spotify-api',
  templateUrl: './spotify-api.component.html',
  styleUrls: ['./spotify-api.component.css']
})
export class SpotifyApiComponent {
  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.checkToken();
  }

  checkToken(): void {
    this.route.queryParams
    .subscribe((query) => {
      if(query['access_token']){
        TOKENDATA.access_token = query['access_token'];
        TOKENDATA.refresh_token = query['refresh_token'];
        this.router.navigate(['/spotify-api/spotify-main'], {queryParams: {access_token: query['access_token'], refresh_token: query['refresh_token']}});
      }
      else  this.router.navigateByUrl('/spotify-api/spotify-login');
    });
  }
}