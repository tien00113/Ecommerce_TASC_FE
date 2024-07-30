import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createOrder,
  createOrderFailure,
  createOrderSuccess,
  getOrderInfo,
  getOrderInfoFailure,
  getOrderInfoSuccess,
} from './order.action';
import { OrderService } from './order.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {}

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrder),
      switchMap(({ order }) =>
        this.orderService.createOrder(order).pipe(
          map((response) => createOrderSuccess({ order: response })),
          catchError((error) =>
            of(
              createOrderFailure({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );
  getOrderInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderInfo),
      switchMap(({ orderId }) =>
        this.orderService.getOrder(orderId).pipe(
          map((response) => getOrderInfoSuccess({ order: response })),
          catchError((error) =>
            of(
              getOrderInfoFailure({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );
}
