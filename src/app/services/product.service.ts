import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = environment;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllProduct(params: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return this.http.post<any>(`${this.baseUrl}/allproduct`, { params: httpParams });
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/${productId}`);
  }

}
