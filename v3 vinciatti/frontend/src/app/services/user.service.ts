import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private APIUrl: string;
  private AppUrl: string;

  constructor(private http: HttpClient) { 
    this.AppUrl = environment.apiUrl
    this.APIUrl = 'api/user'
  }

  signIn(user: User): Observable<any>{
    return this.http.post(`${this.AppUrl}${this.APIUrl}/register`, user)
  }

  logIn(user: {email:string, password: string}): Observable<{token:string}>{
    return this.http.post<{token: string}>(`${this.AppUrl}${this.APIUrl}/login`, user)
  }

  logout(): Observable<void>{
    return new Observable(Observer => {
      this.http.post<{token: string}>(`${this.AppUrl}${this.APIUrl}/logout`, {}).subscribe({
        next: () => {
          Observer.next();
          Observer.complete();
        },
        error: err => {
          Observer.error(err);
        }
      });
      //eliminar el token del localStorage
      localStorage.removeItem('authToken');
      Observer.next();
      Observer.complete();
    })
  }

  getUsers(): Observable<User[]> {
      return this.http.get<{ listUsers: User[] }>(`${this.AppUrl}${this.APIUrl}/getUsers`).pipe(
        map((response: { listUsers: User[] }) => response.listUsers)
      );
    }

}
