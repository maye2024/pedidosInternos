import { 
  HttpInterceptor, 
  HttpRequest,
  HttpEvent, 
  HttpHandler
 } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorsService } from '../services/errors.service';

@Injectable()
export class addTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _errorService: ErrorsService){}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request)
  }
}
