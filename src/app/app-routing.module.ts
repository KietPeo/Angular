import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {path:"",component:HomeComponent,title:"Trang Chủ"},
  {path:"sanpham",component:ProductComponent,title:"Sản Phẩm"},
  {path:"concact",component:ContactComponent,title:"Liên Hệ"},
  {path:"cart",component:CartComponent,title:"Giỏ Hàng"},
  {path:"checkout",component:CheckoutComponent,title:"Thanh Toán"},
  {path:"product-details",component:ProductDetailComponent,title:"Chi tiết sản phẩm"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
