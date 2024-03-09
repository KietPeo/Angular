import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Cart } from './cart';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  protected cartList:Cart[]=[];
  constructor(
    private prod:ProductService,
    private router:Router,
    private authService:AuthService,
    
    ) { }

  getCartAll(){
    return this.cartList
  }
  getInStock(id:number){
    return this.cartList.find(i=>i.Id==id)?.inStock
  }
  addCart(index: number, frmProduct: any) {
    let itemInCart = this.cartList.find(item => item.Id === frmProduct.productId);

    if (!itemInCart) {
        let newItem: Cart = {
            "Id": frmProduct.productId,
            "Name": frmProduct.productName,
            "Code": frmProduct.productCode,
            "Des": frmProduct.description,
            "Price": frmProduct.price,
            "ImageUrl": frmProduct.imageUrl,
            "inStock": frmProduct.inStock,
            "Quantity": 1,
        };
        this.cartList.push(newItem);
        // Giảm số lượng trong kho
        frmProduct.inStock--;
    } else {
        // Kiểm tra null trước khi tăng số lượng
        if (itemInCart.Quantity !== undefined && itemInCart.inStock !== undefined) {
            itemInCart.Quantity++;
            itemInCart.inStock++;
        }
    }
}

RemoveCart(index :number){
  this.cartList[index].inStock!+=1
  this.cartList[index].Quantity!-=1
  if (this.cartList[index].Quantity==0) {
    this.cartList.splice(index,1)
  }
}

  totalItems(){
    let sum=0
    this.cartList.forEach(item=>{
      sum+=item.Quantity!;
    })
    return sum
  }
  Total(){
    let total=0
    this.cartList.forEach(item=>{
      total+=(item.Price!*item?.Quantity!);
    })
    return total
  }

  DeleteAllCart(){
    for (let i = 0; i < this.cartList.length; i++) {
      this.cartList.splice(i,1)
      
    }
    this.cartList=[]
  }

}
