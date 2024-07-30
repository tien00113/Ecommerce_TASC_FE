import { createReducer, on } from '@ngrx/store';
import { getUserInfo, getUserInfoFailture, getUserInfoSuccess, login, loginFailture, loginSuccess, logout, logoutFailture, logoutSuccess } from './auth.action';

export interface State {
  token: string | null;
  error: string | null;
  loading: boolean;
  user: any;
  isLogin: boolean;
}

const initialState: State = {
  token: null,
  loading: false,
  error: null,
  user: null,
  isLogin: false
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loginSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token: token,
    isLogin: true,
    error: null,
  })),

  on(loginFailture, (state, { error }) => ({
    ...state,
    loading: false,
    isLogin: false,
    error: error,
  })),

  on(getUserInfo, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(getUserInfoSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    user: user
  })),

  on(getUserInfoFailture, (state, {error}) => ({
    ...state,
    loading: false,
    error: error
  })),

  //logout
  on(logout, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(logoutSuccess, (state) => ({
    ...state,
    loading: false,
    token: null,
    isLogin: false,
    error: null,
  })),

  on(logoutFailture, (state, { error }) => ({
    ...state,
    loading: false,
    isLogin: false, 
    error: error,
  })),
);
