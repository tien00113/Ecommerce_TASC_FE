import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/AppState';

const selectAuth = (state: AppState) => state.auth;

export const selectToken = createSelector(selectAuth, (state) => state.token);

export const selectError = createSelector(selectAuth, (state) => state.error);

export const selectIsLoading = createSelector(selectAuth, (state) => state.loading);

export const selectIsLogin = createSelector(selectAuth, (state) => state.isLogin);

export const selectUser = createSelector(selectAuth, (state) => state.user);
