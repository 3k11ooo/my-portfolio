import { Component } from '@angular/core';
import { PRODUCTS } from '../../assets/data';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  title = '3k11-Product-Top';
  products = PRODUCTS;
}
