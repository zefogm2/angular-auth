import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
      private authService:AuthentificationService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser=this.authService.currentUserValue;
    if (currentUser?.token) {
      request=request.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
          }
      });
    }


    return next.handle(request);
  }
}
