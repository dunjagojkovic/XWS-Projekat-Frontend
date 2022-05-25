import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem("token")
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 403) {
         return;
        }
        this.router.navigate(['/notFound']);
      }
    }));
  }
}
