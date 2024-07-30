import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {
  registerFailture,
  registerSuccess
} from './auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(auth: any): Observable<any> {
    return this.http.post<any>(`auth/signin`, auth).pipe(
      map((response) => {
        if (response.jwt) {
          localStorage.setItem('jwt', response.jwt);
          return response;
        } else {
          throw new Error('Invalid response structure');
        }
      }),
      catchError((error) => {
        localStorage.removeItem('jwt');
        return of({
          error: error.error?.message || error.message,
        });
      })
    );
  }

  register(auth: any): Observable<any> {
    return this.http.post<any>(`auth/signup`, auth).pipe(
      map((response) => {
        if (response.jwt) {
          localStorage.setItem('jwt', response.jwt);
          console.log("jwt là: ", response.jwt);
        }
        return registerSuccess(response.jwt);
      }),
      catchError((error) => {
        localStorage.removeItem('jwt');
        return of(
          registerFailture(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get('auth/logout', {
      observe: 'response',
      responseType: 'text'  // Yêu cầu phản hồi dưới dạng văn bản
    }).pipe(
      map((response) => {
        console.log('Trạng thái phản hồi:', response.status);
        localStorage.removeItem('jwt');
        return response.status;  // Chỉ trả về trạng thái
      }),
      catchError((error) => {
        console.error('Lỗi khi gọi API:', error);
        return of({
          error: error.error?.message || error.message,
        });
      })
    );
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>('api/user/profile').pipe(
      map((response) => {
        return response;
      }), catchError((error) => {
        console.log("oke", error)
        return of( {
          error: error.error?.message || error.message,
        })
      })
    )
  }
}
