import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../config/api';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { ProductFilterRequest } from '../../models/ProductFilterRequest';
import {
  getAllProductFailure,
  getAllProductSuccess,
  getProductDetailFailure,
  getProductDetailSuccess,
} from './product.action';
import { Observable, catchError, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProduct(filter: ProductFilterRequest): Observable<any> {
    let params = new HttpParams();

    if (filter.minPrice !== undefined) {
      params = params.append('minPrice', filter.minPrice.toString());
    }
    if (filter.maxPrice !== undefined) {
      params = params.append('maxPrice', filter.maxPrice.toString());
    }
    if (filter.categoryId !== undefined) {
      params = params.append('categoryId', filter.categoryId.toString());
    }
    if (filter.color) {
      params = params.append('color', filter.color);
    }
    if (filter.pageableDTO) {
      params = params.append('page', filter.pageableDTO.page.toString());
      params = params.append('size', filter.pageableDTO.size.toString());
      params = params.append('sortProperty', filter.pageableDTO.sortProperty);
      params = params.append('sortDirection', filter.pageableDTO.sortDirection);
    }
    return this.http.get<any>('public/product', {params})
  }

  getProductDetail(productId: number): Observable<any> {
    return this.http.get(`public/product/${productId}`).pipe(
      map((productDetail: any) => {
        console.log('product detail: ', productDetail);
        return getProductDetailSuccess({ productDetail: productDetail });
      }),
      catchError((error) => {
        console.log('error get product detail: ');

        return of(
          getProductDetailFailure(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      })
    );
  }

  getProductVariant(id: number): Observable<any> {
    return this.http.get(`public/product/variant/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return of(
          {
            error: error.error?.message || error.message,
          }
        )
      })
    )
  }
}
