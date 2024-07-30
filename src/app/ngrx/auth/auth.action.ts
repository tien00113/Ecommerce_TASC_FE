import { createAction, props } from "@ngrx/store";

export const login = createAction('[Auth] login', props<{auth: any}>());
export const loginSuccess = createAction('[Auth] login success', props<{token: any}>());
export const loginFailture = createAction('[Auth] login failture', props<{error: any}>());

export const register = createAction('[Auth] register', props<{auth: any}>());
export const registerSuccess = createAction('[Auth] register success', props<{token: any}>());
export const registerFailture = createAction('[Auth] register failture', props<{error: any}>());

export const getUserInfo = createAction('[Auth] getUserInfo');
export const getUserInfoSuccess = createAction('[Auth] getUserInfo success', props<{user: any}>());
export const getUserInfoFailture = createAction('[Auth] getUserInfo failture', props<{error: any}>());

export const logout = createAction('[Auth] logout');
export const logoutSuccess = createAction('[Auth] logout success');
export const logoutFailture = createAction('[Auth] logout failture', props<{error: any}>());