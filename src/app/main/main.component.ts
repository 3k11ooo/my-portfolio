import { Component } from '@angular/core';
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
    
  ngOnInit(): void {

  }
}
