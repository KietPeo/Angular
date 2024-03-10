import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalItems: number = 0;
  cartList: Cart[] = [];
  productDetail: Product | undefined;
  InStock: number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartAll();
    this.totalItems = this.cartService.getCartQuantity();
  }

  Add() {
    if (this.productDetail && this.InStock > 0) {
      this.cartService.addCart(this.productDetail.id!, this.productDetail);
      this.totalItems++;
    }
  }

  Remove(index: number) {
    this.cartService.RemoveItemCart(index);
    this.totalItems--;
  }

  ItemCount() {
    return this.totalItems;
  }

  ItemSum() {
    return this.cartService.TotalItem();
  }

  DeleteAll() {
    this.cartService.DeleteAllCart().subscribe(() => {
      this.cartList = [];
      this.totalItems = 0;
    });
  }
  // checkout() {
  //   this.router.navigate(['/checkout'], { queryParams: { cartList: this.cartList, totalItems:this.totalItems} });
  //   // console.log(this.cartList);
  // }
}
