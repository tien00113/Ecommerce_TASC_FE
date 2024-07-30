import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/AppState';

const selectCart = (state: AppState) => state.cart;

export const selectCartItem = createSelector(selectCart, (state) => state.cartItem);

export const selectError = createSelector(selectCart, (state) => state.error);

export const selectIsLoading = createSelector(selectCart, (state) => state.loading);

export const selectMessage = createSelector(selectCart, (state) => state.message);

export const selectCarts = createSelector(selectCart, (state) => state.cart);

