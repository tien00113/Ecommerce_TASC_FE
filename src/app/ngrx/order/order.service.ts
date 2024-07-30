import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { OrderRequest } from '../../models/OrderRequest';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(item: OrderRequest): Observable<any> {
    return this.http.post('private/order', item).pipe(
      map((response) => {
        console.log('order thành công: ', response);
        return response;
      }),
      catchError((error) => {
        return of({
          error: error.error?.message || error.message,
        });
      })
    );
  }

  getOrder(id: string): Observable<any> {
    return this.http.get(`public/order/${id}`).pipe(
      map((response) => {
        console.log("order là:", response);
        return response;
      }),
      catchError((error) => {
        return of({
          error: error.error?.message || error.message,
        });
      })
    );
  }
}
