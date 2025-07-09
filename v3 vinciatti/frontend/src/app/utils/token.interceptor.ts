import { 
  HttpInterceptor, 
  HttpRequest,
  HttpEvent, 
  HttpHandler,
  HttpErrorResponse
 } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from '../services/errors.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  
  constructor(private router: Router, private _errorService: ErrorsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const token = localStorage.getItem('token')
     if (token) {
      console.log("Hola");
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    } else {
      
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this._errorService.messageError(error)
        this.router.navigate(['/logIn'])
      }
      return throwError(() => error)
    })); 
  }
};
