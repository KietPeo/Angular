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

  constructor( private http:HttpClient) { }
  
  getProductAll() : Observable <Product[]>{
    return this.http.get<Product[]>(`${this.URL}`)
  }
  // getProductId(id :number){
  //   return this.http.get<Product>(`${this.URL}/${id}`)
  // }
  getProductId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`);
  }
  
}
