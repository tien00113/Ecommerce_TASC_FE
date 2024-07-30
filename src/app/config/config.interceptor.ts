import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and add the base URL
    let cloneReq = req.clone({ url: `${environment.baseUrl}/${req.url}` });

    if (typeof window !== 'undefined') {
      // Lấy token từ localStorage
      const token = localStorage.getItem('jwt');

      // Nếu có token và yêu cầu không phải là API công khai, thêm token vào header
      if (token && !cloneReq.url.startsWith(`${environment.baseUrl}/public`) && !cloneReq.url.startsWith(`${environment.baseUrl}/auth`)) {
        // Clone the request and set the new headers
        cloneReq = cloneReq.clone({
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        });
      }
    }
    return next.handle(cloneReq);
  }
}
