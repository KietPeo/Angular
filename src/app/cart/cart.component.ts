import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { Cart } from '../cart'; // Đảm bảo import Cart từ đúng đường dẫn

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productDetail: Product | undefined;

  // Điều chỉnh kiểu dữ liệu của cartList thành mảng của các đối tượng Cart
  cartList: Cart[] = [];
  InStock: number = 0;
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) 
  {
    this.cartList = cartService.getCartAll(); // Gán mảng cartList từ cartService
  }
  ngOnInit(): void {
    let id = Number(this.router.snapshot.params['id']);
    this.productService.getProductId(id).subscribe((product: Product) => {
      this.productDetail = product;
      this.InStock = this.productDetail?.inStock!;
    });
  }
  Add() {
    this.cartService.addCart(this.productDetail?.id!, this.productDetail);
    this.InStock = this.cartService.getInStock(this.productDetail?.id!)!;
}
Remove(index: number) {
  // this.cartService.RemoveCart(index);
  let id=this.cartService.cartList
  this.cartService.RemoveItemCart(index)
}
//coi thử đi e
  
  ItemCount() {
    return this.cartService.totalItems();
  }
  ItemSum() {
    return this.cartService.Total();
  }
  DeleteAll() {
   this.cartService.DeleteAllCart().subscribe((data:any)=>{
    this.cartList=data
   })
  }
}
