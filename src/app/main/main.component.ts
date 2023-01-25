import { Component } from '@angular/core';
import { Event, NavigationEnd, RouterEvent, Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { SUBTITLE, PRODUCTS } from '../../assets/data';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'TOP';
  subTitles = SUBTITLE;
  products = PRODUCTS;
  siteURL: string | null = null;
    
  constructor(){}
  

  ngOnInit(): void {
    // this.getUrl();
  }

  getUrl(){
    this.siteURL = document.location.origin;
    console.log(this.siteURL);
  }
}
