import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { getUserCart, removeCartItem } from '../ngrx/cart/cart.action';
import { Actions } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../currency-format.pipe';
import { combineLatest, filter, forkJoin, map, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { selectCarts } from '../ngrx/cart/cart.selectors';
import { Router } from '@angular/router';
import { getProductVariant } from '../ngrx/product/product.action';
import { selectVariants } from '../ngrx/product/product.selectors';
import { VariantResult } from '../models/VariantResult';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe]
})

export class CartComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { 
    
  }

  private subscriptions: Subscription = new Subscription();

  cart: any;
  isCartEmpty: boolean = true;

  ngOnInit() {
    this.store.dispatch(getUserCart());
    this.subscriptions.add(
      this.store.select(selectCarts).pipe(
        switchMap(cart => {
          this.cart = cart;
          this.isCartEmpty = !cart || cart?.cartItems?.length === 0;

          if (cart && cart.cartItems) {
            cart.cartItems.forEach((item: any) => {
              this.store.dispatch(getProductVariant({ id: item.productId }));
            });

            return combineLatest([
              this.store.select(selectCarts),
              this.store.select(selectVariants)
            ]).pipe(
              map(([cart, variants]) => {
                const variantMap = new Map<number, any>(Object.entries(variants).map(([productId, variant]) => [Number(productId), variant]));

                const updatedCartItems = cart.cartItems.map((item: any) => ({
                  ...item,
                  variant: variantMap.get(item.productId) || null
                }));

                return { ...cart, cartItems: updatedCartItems };
              })
            );
          }

          return of(cart);
        })
      ).subscribe(cart => {
        this.cart = cart;
      })
    );
  }

  removeItem(itemId: number){
    this.store.dispatch(removeCartItem({itemId}));
  }

  // getVariant(id: any){
  //   this.store.dispatch(getProductVariant(id));

  //   this.subscriptions.add(
  //     this.store.select(selectVariants).subscribe((variant) => {
  //       return variant;
  //     })
  //   )
  // }

}
