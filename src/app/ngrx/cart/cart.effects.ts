import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from './cart.service';
import {
  addToCart,
  addToCartFailture,
  addToCartSuccess,
  getUserCart,
  getUserCartFailture,
  getUserCartSuccess,
  removeCartItem,
  removeCartItemFailture,
  removeCartItemSuccess,
} from './cart.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService, private router: Router) {}
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      switchMap(({ cartItem }) =>
        this.cartService.addToCart(cartItem).pipe(
          map((response) => addToCartSuccess({ cartItem: response })),
          catchError((error) =>
            of(
              addToCartFailture({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );
  navigateToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCartSuccess),
        tap(() => this.router.navigate(['/cart']))
      ),
    { dispatch: false }
  );
  
  getUserCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserCart),
      switchMap(() =>
        this.cartService.getUserCart().pipe(
          map((response) => getUserCartSuccess({ cart: response })),
          catchError((error) =>
            of(
              getUserCartFailture({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );

  removeCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCartItem),
      switchMap(({ itemId }) =>
        this.cartService.removeCartItem(itemId).pipe(
          map((response) => removeCartItemSuccess({ message: response, itemId: itemId })),
          catchError((error) =>
            of(
              removeCartItemFailture({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );
}
