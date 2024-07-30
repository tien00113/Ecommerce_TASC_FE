import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/AppState';

export const selectProduct = (state: AppState) => state.product;

export const selectAllProducts = createSelector( selectProduct, (state) => state.products);

export const selectVariants = createSelector(selectProduct, (state) => state.variants);
