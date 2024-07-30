import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { CartItem } from '../../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(cartItem: CartItem): Observable<any> {
    return this.http.post(`private/order/cart/addtocart`, cartItem).pipe(
      map((response) => {
        console.log('da them vao gio hang: ', response);
        return response;
      }),
      catchError((error) => {
        return of({
          error: error.error?.message || error.message,
        });
      })
    );
  }

  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`private/order/cart/remove/${cartItemId}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => { 
        return of({
          error: error.error?.message || error.message,
        });
      })
    );
  }

  getUserCart(): Observable<any> {
    return this.http.get('private/order/cart').pipe(
      map((response) => {
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
