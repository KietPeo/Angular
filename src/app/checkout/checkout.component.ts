import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartList: Cart[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cartList = Object.values(params['cartList']);
      console.log('Cart list:', params['cartList']);
    
    });
   this.cartList= this.cartService.getCartAll()
  }
  // Function to calculate total price
  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartList.forEach(item => {
      if (item.Price !== undefined && item.Quantity !== undefined) {
        totalPrice += item.Price * item.Quantity;
      }else{
        console.log('sai');
      }
    });
    return totalPrice;
  }
  hello(){
    alert('Chúc mừng bạn đã qua môn ')
  }
  
}
