import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../product.service'; // Import Product từ product.service.ts
import { Product } from '../product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private productService: ProductService
  ) { }
  
  cartQuantity: number = 0;

  ngOnInit(): void {
    this.updateCartQuantity();
  }

  updateCartQuantity() {
    const cartProducts: Product[] = this.productService.getCartProducts();
    this.cartQuantity = cartProducts.reduce((total, product) => total + product.inStock, 0);
  }
  
}
