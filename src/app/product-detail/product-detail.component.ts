import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  //interface xài nhiêu thì bỏ ở ngoài không cần mỗi thằng mỗi tạo đâu
  productDetail : Product| undefined
  constructor(
    private router :ActivatedRoute,
    private Productservice :ProductService,
    private CartService :CartService,
  ){}
  ngOnInit(): void {
      let id=Number(this.router.snapshot.params['id']);
      this.Productservice.getProductId(id).subscribe(data=>{
        this.productDetail=data
      })
  }
  Add(){
   this.CartService.addCart(this.productDetail?.id!,this.productDetail)
    alert("Thêm thành công ")
  }
}