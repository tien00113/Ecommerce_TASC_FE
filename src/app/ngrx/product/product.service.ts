import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../../config/api";
import { Store } from "@ngrx/store";
import { AppState } from "../../models/AppState";
import { ProductFilterRequest } from "../../models/ProductFilterRequest";
import { getAllProductFailure, getAllProductSuccess, getProductDetailFailure, getProductDetailSuccess } from "./product.action";
import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private apiUrl = BASE_URL;


    constructor(private http: HttpClient, private store: Store<AppState>) { }

    getAllProduct(filter: ProductFilterRequest) : Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/allproduct`, filter).pipe(
            map((pageable: any) => {
                console.log("pageable all product: ", pageable);
                return getAllProductSuccess({ pageable});
            }),
            catchError((error) => {

                console.log("lỗi: ", error);
                return of(
                    getAllProductFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )

            })
        )
    }

    getProductDetail(productId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}/product/${productId}`).pipe(
            map((productDetail: any) => {
                console.log("product detail: ", productDetail);
                return getProductDetailSuccess({ productDetail: productDetail })
            }),
            catchError((error) => {
                console.log("error get product detail: ");

                return of(
                    getProductDetailFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        )
    }
}