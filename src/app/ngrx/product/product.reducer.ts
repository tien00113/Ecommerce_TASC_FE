import { createReducer, on } from "@ngrx/store"
import { getAllProduct, getAllProductFailure, getAllProductSuccess, getProductDetail, getProductDetailFailure, getProductDetailSuccess, getProductVariant, getProductVariantFailure, getProductVariantSuccess } from "./product.action"

const initialState = {
    pageable: null,
    product: null,
    products: [],
    variants: {},
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

    //variant
    on(getProductVariant, (state) => ({
        ...state,
        loading: true
    })),
    on(getProductVariantSuccess, (state, {variant}) => ({
        ...state,
        loading: false,
        variants: {
            ...state.variants,
            [variant.id]: variant
          }
    })),
    on(getProductVariantFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    }))
)