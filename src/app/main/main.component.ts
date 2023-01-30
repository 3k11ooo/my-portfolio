import { Component } from '@angular/core';
import { SUBTITLE } from '../../assets/data';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'TOP';
  subTitles = SUBTITLE;
      
  constructor(){}
  

  ngOnInit(): void {

  }
}
