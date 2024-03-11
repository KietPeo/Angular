import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Cart } from './cart';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Subject, Observable, of } from 'rxjs';
@Injectable({

  providedIn: 'root'
})
export class CartService {
   cartList:Cart[]=[];  
  private cartListSubject = new Subject<Cart[]>(); // Subject để thông báo về sự thay đổi trong cartList
  totalItems: number = 0; // Tổng số lượng sản phẩm trong giỏ hàng

  constructor(private prod: ProductService, private router: Router, private authService: AuthService) { 
    
  }

  getCartAll(){
    return this.cartList
  }
  getCartListObservable(): Observable<Cart[]> {
    return this.cartListSubject.asObservable();
  }
  updateCartList(cartList: Cart[]): void {
    this.cartList = cartList;
    this.cartListSubject.next(cartList); // Thông báo về sự thay đổi trong cartList
  }

  getInStock(id:number){
    return this.cartList.find(i=>i.Id==id)?.inStock
  }

  addCart(index: number, frmProduct: any) {
  // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
  let existingCartItem = this.cartList.find(item => item.Id === frmProduct.id);

  if (!existingCartItem) {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng với số lượng là 1
      let newItem: Cart = {
          Id: frmProduct.id,
          Name: frmProduct.productName,
          Code: frmProduct.productCode,
          Des: frmProduct.description,
          Price: frmProduct.price,
          ImageUrl: frmProduct.imageUrl,
          inStock: frmProduct.inStock,
          Quantity: 1 // Đặt số lượng mặc định là 1 cho sản phẩm mới
      };
      
      this.cartList.push(newItem);
  } else {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng của nó lên 1
      if (existingCartItem) {
          existingCartItem.Quantity = (existingCartItem.Quantity ?? 0) + 1;
          existingCartItem.inStock = (existingCartItem.inStock ?? 0) + 1;
      }
  }
}

  Total(){
    let sum=0
    this.cartList.forEach(item=>{
      sum+=item.Quantity!;
    })
    // console.log(sum);
    return sum
  }
  TotalItem(){
    let sum=0
    this.cartList.forEach(item=>{
      sum+=item.Price!*item.Quantity!;
    })
    // console.log(sum);
    return sum
  }
  
  getCartQuantity(): number {
    let totalQuantity = 0;

    this.cartList.forEach(item => {
      totalQuantity += item.Quantity || 0;
    });
    // console.log(this.cartList);
    return totalQuantity;
  }
  

  
  RemoveItemCart(id:number){
    const index=this.cartList.findIndex(item=>item.Id===id)
    if (index !== -1) {
      this.cartList.splice(index, 1);
    }
  }
  DeleteAllCart() :Observable<any> {
     return of(this.cartList=[])
  }
  

  
}
