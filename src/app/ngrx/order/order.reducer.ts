import { createReducer, on } from '@ngrx/store';
import {
  createOrder,
  createOrderFailure,
  createOrderSuccess,
  getOrderInfo,
  getOrderInfoFailure,
  getOrderInfoSuccess,
} from './order.action';
import { PaymentRequest } from '../../models/PaymentRequest';

export interface OrderState {
  order: PaymentRequest | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};
export const orderReducer = createReducer(
  initialState,

  on(createOrder, (state) => ({
    ...state,
    loading: true,
  })),
  on(createOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    order: order,
    error: null,
  })),
  on(createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  //order detail
  on(getOrderInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(getOrderInfoSuccess, (state, {order}) => ({
    ...state, 
    loading: false,
    order: order
  })),
  on(getOrderInfoFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error: error
  }))
);
