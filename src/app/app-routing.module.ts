import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "sanpham", component: ProductComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "contact", component: ContactComponent },
  { path: "cart", component: CartComponent },
  { path: "admin", component: AdminComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "product-detail/:id", component: ProductDetailComponent,title:"Chi Tiết sản phẩm" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
