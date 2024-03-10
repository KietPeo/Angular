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
  private defaultImagePath = '../assets/img/'; // Đường dẫn mặc định

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
    // Kiểm tra xem có đường dẫn hình ảnh mới không, nếu không thì giữ nguyên
    let imageUrl = updatedProduct.imageUrl;
    if (!imageUrl.startsWith('data:image')) {
      // Lấy tên file từ đường dẫn trả về từ trình duyệt
      const fileName = imageUrl.split('\\').pop();
      // Tạo đường dẫn mới sử dụng tên file đã lấy
      imageUrl = this.defaultImagePath + fileName;
    }
    // Cập nhật đối tượng sản phẩm với đường dẫn hình ảnh đã sửa
    const updatedProductWithImagePath = { ...updatedProduct, imageUrl: imageUrl };
    // Chuyển id về dạng string
    const idString = id.toString();
    // Xây dựng URL
    const url = `${this.URL}/${idString}`;
    // Gọi API PUT để cập nhật sản phẩm
    return this.http.put<Product>(url, updatedProductWithImagePath);
  }
  
  
  
  DeleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }

  // Lấy tất cả sản phẩm
  getProductAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }

  addProductToCart(productData: any): Observable<any> {
    const productWithId = { ...productData, id: this.nextId++ };
    // Thêm sản phẩm mới vào mảng cartProducts
    this.cartProducts.push(productWithId);
    // Gọi phương thức updateCartQuantity để cập nhật số lượng sản phẩm trong giỏ hàng
    this.updateCartQuantity();
    return this.http.post<any>(`${this.URL}`, productWithId);
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng dựa trên sản phẩm trong mảng cartProducts
  private updateCartQuantity(): void {
    this.cartProducts.reduce((total, product) => total + product.inStock, 0);
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
