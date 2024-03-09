import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  products: Product[] = [];
  productDetail : Product| undefined
  productService : ProductService = inject(ProductService)
  constructor() {
    
    this.productService. getProductAll().subscribe(data=>{
      this.products=data
    })
  }
}
