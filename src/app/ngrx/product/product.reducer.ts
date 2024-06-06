import { createReducer, on } from "@ngrx/store"
import { getAllProduct, getAllProductFailure, getAllProductSuccess, getProductDetail, getProductDetailFailure, getProductDetailSuccess } from "./product.action"

const initialState = {
    pageable: null,
    product: null,
    products: [],
    loading: false,
    error: null,
}

export const productReducer = createReducer(
    initialState,
    on(getAllProduct, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(getAllProductSuccess, (state, {pageable}) => ({
        ...state,
        loading: false,
        pageable: pageable,
        products: pageable.content
    })),

    on(getAllProductFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),

    //get detail:
    on(getProductDetail, (state) => ({
        ...state,
        loading:true,
        error: null
    })),
    on(getProductDetailSuccess, (state, {productDetail}) => ({
        ...state,
        loading: false,
        product: productDetail,
        error: null
    })),
    on(getProductDetailFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),
)