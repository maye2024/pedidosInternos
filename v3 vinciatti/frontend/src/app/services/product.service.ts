import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private APIUrl: string;
  private AppUrl: string;

  constructor(private http: HttpClient) { 
    this.AppUrl = environment.apiUrl
    this.APIUrl = 'api/product'
  }

  // getProducts(): Observable<Product[]>{
  //   console.log(`${this.AppUrl}${this.APIUrl}/getProducts`);
  //   return this.http.get<Product[]>(`${this.AppUrl}${this.APIUrl}/getProducts`)
  //   // const token = localStorage.getItem('token')
  //   // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  //   //   return this.http.get<Product>(`${this.AppUrl}${this.APIUrl}/getProducts`, {headers: headers})
  //   }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ listProducts: Product[] }>(`${this.AppUrl}${this.APIUrl}/getProducts`)
      .pipe(map(response => response.listProducts));
  }

  addProduct(product: Product): Observable<any>{
    return this.http.post(`${this.AppUrl}${this.APIUrl}/register`, product)
  }
  
  updateProduct(id: number, product: Product){
    return this.http.put(`${this.AppUrl}${this.APIUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.AppUrl}${this.APIUrl}/${id}`);
  }
}
