import { Component } from '@angular/core';
import { TOKENDATA } from 'src/assets/spotify/spotify-data';
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
