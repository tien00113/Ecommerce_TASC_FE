import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/AppState';

const selectOrders = (state: AppState) => state.order;

export const selectOrder = createSelector(selectOrders, (state) => state.order);

export const selectError = createSelector(selectOrders, (state) => state.error);

export const selectIsLoading = createSelector(selectOrders, (state) => state.loading);