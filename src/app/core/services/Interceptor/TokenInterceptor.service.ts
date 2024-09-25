import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private route: ActivatedRoute) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token')!;
    let requestRetorno: HttpRequest<any>;
    if (token) {
      requestRetorno = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    } else {
      requestRetorno = req.clone();
    }
    return next.handle(requestRetorno);
  }
}
