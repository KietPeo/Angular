import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  products: any[] = [];

  
 
  constructor(private http: HttpClient,
    public authService: AuthService,
    private cartService: CartService // Inject CartService vào HeaderComponent
  ) { }
  
  cartQuantity: number = 0;

  ngOnInit(): void {
    this.updateCartQuantity();
    this.getValues(); 
  }

  updateCartQuantity(): void {
    this.cartQuantity = this.cartService.getCartQuantity();
  }

  itemcount(){
    return this.cartService.Total();
  }
  getValues() {
    this.http.get<any[]>('http://localhost:4000/products').subscribe(
      (data) => {
        this.products = data;
        // console.log('Products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
