import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart.service'; // Import CartService từ cart.service.ts

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private cartService: CartService // Inject CartService vào HeaderComponent
  ) { }
  
  cartQuantity: number = 0;

  ngOnInit(): void {
    this.updateCartQuantity();
  }

  updateCartQuantity(): void {
    this.cartQuantity = this.cartService.getCartQuantity();
  }

  itemcount(){
    return this.cartService.Total();
  }
}
