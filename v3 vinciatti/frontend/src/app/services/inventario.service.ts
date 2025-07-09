import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Inventario } from '../interfaces/inventario';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private APIUrl: string;
  private AppUrl: string;
  
  constructor(private http: HttpClient) { 
    this.AppUrl = environment.apiUrl
    this.APIUrl = 'api/inventario'
  }

  // getInventario(): Observable<Inventario[]>{
  //   console.log(`${this.AppUrl}${this.APIUrl}/getInventario`);
  //   return this.http.get<Inventario[]>(`${this.AppUrl}${this.APIUrl}/getInventario`)
  // }

  getInventario(): Observable<Inventario[]> {
      console.log(`${this.AppUrl}${this.APIUrl}/getInventario`);
      return this.http.get<{ listInventario: Inventario[] }>(`${this.AppUrl}${this.APIUrl}/getInventario`).pipe(
        map(response => response.listInventario)
      );
    }

    registrarInventario(inventario: Inventario): Observable<any> {
      return this.http.post(`${this.AppUrl}${this.APIUrl}/register`, inventario)
    }

     // Actualizar inventario existente
    updateInventario(id: number, inventario: Inventario){
      return this.http.put(`${this.AppUrl}${this.APIUrl}/${id}`, inventario);
    }

   //getProducts(): Observable<Product[]>{
    // console.log(`${this.AppUrl}${this.APIUrl}/getProducts`);
    //  return this.http.get<Product[]>(`${this.AppUrl}${this.APIUrl}/getProducts`)
      // const token = localStorage.getItem('token')
      // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      //   return this.http.get<Product>(`${this.AppUrl}${this.APIUrl}/getProducts`, {headers: headers})
    //  }

}
