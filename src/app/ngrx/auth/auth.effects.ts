import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  getUserInfo,
  getUserInfoFailture,
  getUserInfoSuccess,
  login,
  loginFailture,
  loginSuccess,
  logout,
  logoutFailture,
  logoutSuccess,
  register,
  registerFailture,
  registerSuccess
} from './auth.action';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>   
    this.actions$.pipe(
      ofType(login),
      switchMap(({ auth }) =>
        this.authService.login(auth).pipe(
          map(response => loginSuccess({ token: response.jwt })),
          catchError(error => of(loginFailture({ error: error.error?.message || error.message })))
        )
      )
    )
  );

  register$ = createEffect(() =>   
    this.actions$.pipe(
      ofType(register),
      switchMap(({ auth }) =>
        this.authService.register(auth).pipe(
          map(response => registerSuccess({ token: response.jwt })),
          catchError(error => of(registerFailture({ error: error.error?.message || error.message })))
        )
      )
    )
  );

  user$ = createEffect(() => this.actions$.pipe(
    ofType(getUserInfo),
    switchMap(() => 
      this.authService.getUserInfo().pipe(
        map(response => getUserInfoSuccess({user: response})),
        catchError(error => of(getUserInfoFailture({error: error.error?.message || error.message})))
      )
    )
  ));

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() => 
        this.authService.logout().pipe(
          map(() => logoutSuccess()),
          catchError(error => of(logoutFailture({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
