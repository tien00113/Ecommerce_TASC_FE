import { createAction, props } from "@ngrx/store";
import { OrderRequest } from "../../models/OrderRequest";
import { PaymentRequest } from "../../models/PaymentRequest";

export const createOrder = createAction('[Order] createOrder', props<{order: OrderRequest}>());
export const createOrderSuccess = createAction('[Order] createOrder success', props<{order: PaymentRequest}>());
export const createOrderFailure = createAction('[Order] createOrder failure', props<{error: any}>());

export const getOrderInfo = createAction('[Order] getOrderInfo', props<{orderId: any}>());
export const getOrderInfoSuccess = createAction('[Order] getOrderInfo success', props<{order: any}>());
export const getOrderInfoFailure = createAction('[Order] getOrderInfo failure', props<{error: any}>());

