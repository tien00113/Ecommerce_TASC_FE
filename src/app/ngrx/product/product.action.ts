import { createAction, props } from "@ngrx/store";
import { ProductFilterRequest } from "../../models/ProductFilterRequest";

export const getAllProduct = createAction('[Product] getAllProduct');
export const getAllProductSuccess = createAction('[Product] getAllProduct success', props<{pageable: any}>());
export const getAllProductFailure = createAction('[Product] getAllProduct failure', props<{error: any}>());

export const getProductDetail = createAction('[Product] getProductDetail', props<{productId: number}>());
export const getProductDetailSuccess = createAction('[Product] getProductDetail success', props<{productDetail: any}>());
export const getProductDetailFailure = createAction('[Product] getProductDetail failure', props<{error: any}>());