import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the authorization token from wherever you store it (e.g., local storage, state management).
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parseData = JSON.parse(userData);
      const authToken = parseData.token;

      // Clone the request and add the authorization header.
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Pass the modified request to the next interceptor or the HTTP client.
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
    return next.handle(request);
  }
}
