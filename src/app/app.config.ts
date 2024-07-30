import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { HttpHeadersInterceptor } from './config/config.interceptor';
import { AuthEffects } from './ngrx/auth/auth.effects';
import { authReducer } from './ngrx/auth/auth.reducer';
import { CartEffects } from './ngrx/cart/cart.effects';
import { cartReducer } from './ngrx/cart/cart.reducer';
import { productReducer } from './ngrx/product/product.reducer';
import { orderReducer } from './ngrx/order/order.reducer';
import { OrderEffects } from './ngrx/order/order.effects';
import { ProductEffects } from './ngrx/product/product.effects';


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
    ),
    provideStore(
      {
        product: productReducer,
        cart: cartReducer,
        auth: authReducer,
        order: orderReducer
      }
    ),
    provideEffects([AuthEffects, CartEffects, OrderEffects,ProductEffects]),
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
  ]
};
