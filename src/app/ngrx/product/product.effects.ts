import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getAllProduct,
  getAllProductFailure,
  getAllProductSuccess,
  getProductVariant,
  getProductVariantFailure,
  getProductVariantSuccess,
} from './product.action';
import { ProductService } from './product.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProduct),
      mergeMap((action) =>
        this.productService.getAllProduct(action.filter).pipe(
          map((response) => getAllProductSuccess({ pageable: response })),
          catchError((error) =>
            of(
              getAllProductFailure({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );

  loadVariant$ = createEffect(()=> 
  this.actions$.pipe(
    ofType(getProductVariant),
    mergeMap((action) => this.productService.getProductVariant(action.id).pipe(
      map((response) => getProductVariantSuccess({variant: response})),
      catchError((error) => of(
        getProductVariantFailure({
          error: error.error?.message || error.message,
        })
      ))
    ))
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
