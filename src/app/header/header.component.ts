import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  cartQuantity: number = 0;

  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.updateCartQuantity();
    this.checkAdminRole();
  }

  updateCartQuantity(): void {
    this.cartQuantity = this.cartService.getCartQuantity();
  }

  checkAdminRole(): void {
    this.authService.getAdmin().subscribe(users => {
      const isAdminUser = users.find(user => user.role === 1);
      this.isAdmin = !!isAdminUser; // Gán giá trị isAdmin dựa trên kết quả tìm kiếm
    });
  }

  itemcount(): number {
    return this.cartService.Total();
  }
}
