import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Auto(){
    var max=1;
    this.products.forEach(item=>{
      if (item.id>max) {
        max=item.id;
      }
    })
    return max +1
  }

  products :Product[]=[]
  private URL= `http://localhost:4000/products`
  private cartProducts: Product[] = [];
  nextId: number = 4; // Giả sử id bắt đầu từ 4

  constructor( private http:HttpClient) { }

  getCartProducts(): Product[] {
    return this.cartProducts;
  }
  getProduct(): Product[] {
    return this.products;
  }
  
  getAllProductList(): Product[] {
    return this.products
  }//Thêm form model vào product-list 

  
  EditProduct(id: number) {
    return this.products[id];
  }
  
  // Hàm cập nhật thông tin sản phẩm
  updateProduct(id: number, updatedProduct: Product): Observable<Product> {
    const url = `${this.URL}/${id}`;
    return this.http.put<Product>(url, updatedProduct);
  }
  
  DeleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }

  // Lấy tất cả sản phẩm
  getProductAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }

  // Thêm sản phẩm mới
  addProduct(productData: any): Observable<any> {
    const productWithId = { ...productData, id: this.nextId++ };
    return this.http.post<any>(`${this.URL}`, productWithId);
  }
  

  // Lấy thông tin sản phẩm bằng ID
  getProductId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`);
  }

  // Cập nhật danh sách sản phẩm
  updateProductList(products: Product[]): void {
    // Cập nhật danh sách sản phẩm trong service
    this.products = products;
  }

 
}
