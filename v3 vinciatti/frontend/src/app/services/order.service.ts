import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private APIUrl: string;
  private AppUrl: string;

  constructor(private http: HttpClient) { 
    this.AppUrl = environment.apiUrl
    this.APIUrl = 'api/orders'
  }


  getOrders(): Observable<Order[]>{
    console.log(`${this.AppUrl}${this.APIUrl}/getOrders`);
    return this.http.get<{ listOrders: Order[] }>(`${this.AppUrl}${this.APIUrl}/getOrders`).pipe(
      map(response => response.listOrders)
    );
  }


  createOrders(order: Order): Observable<any>{
    console.log(`${this.AppUrl}${this.APIUrl}/register`);
    return this.http.post(`${this.AppUrl}${this.APIUrl}/register`, order)
  }

  // updateOrder(id: number, usuarioId: string): Observable<any>{
  //   return this.http.put(`${this.AppUrl}${this.APIUrl}/${id}/update`, {id, usuarioId})
  // }

  updateOrder(id: number, updatedData: { fechaEntrega: string, estado: string }) {
    return this.http.put(`${this.AppUrl}${this.APIUrl}/${id}`, updatedData);
  }
  
}
