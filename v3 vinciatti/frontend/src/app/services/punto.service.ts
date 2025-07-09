import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Punto } from '../interfaces/punto';

@Injectable({
  providedIn: 'root'
})
export class PuntoService {

  private APIUrl: string;
  private AppUrl: string;

  constructor(private http: HttpClient) { 
    this.AppUrl = environment.apiUrl
    this.APIUrl = 'api/punto'
  }

  getPuntos(): Observable<Punto[]> {
    return this.http.get<{ listPuntos: Punto[] }>(`${this.AppUrl}${this.APIUrl}/getPuntos`).pipe(
      map((response: { listPuntos: Punto[] }) => response.listPuntos)
    );
  }
  // getPuntos(): Observable<Punto[]>{
  //   console.log(`${this.AppUrl}${this.APIUrl}/getPuntos`);
  //   return this.http.get<Punto[]>(`${this.AppUrl}${this.APIUrl}/getPuntos`)
  // }

  addPunto(punto: Punto): Observable<any>{
      return this.http.post(`${this.AppUrl}${this.APIUrl}/register`, punto)
  }

  updatePunto(id: number, punto: Punto){
      return this.http.put(`${this.AppUrl}${this.APIUrl}/${id}`, punto);
  }

  deletePunto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.AppUrl}${this.APIUrl}/${id}`);
  }
}