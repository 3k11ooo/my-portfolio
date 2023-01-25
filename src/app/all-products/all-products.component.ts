import { Component } from '@angular/core';
import { Event, NavigationEnd, ActivatedRoute, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  title = '3k11-Product-Top';
  style: any = {
    display : 'block'
  };

  constructor(private router : Router, private route: ActivatedRoute) {}
  ngOnInit(){
    
  }
}
