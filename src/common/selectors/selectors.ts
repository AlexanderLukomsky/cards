import { StatusType } from 'common/types';
import { AppRootStateType } from 'store';

export const selectIsInitializedApp = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const selectAppStatus = (state: AppRootStateType): StatusType => state.app.status;

export const selectIsAuth = (state: AppRootStateType): boolean => state.auth.isAuth;

export const selectUserAvatar = (state: AppRootStateType): string | undefined =>
  state.auth.data.avatar;

export const selectUserName = (state: AppRootStateType): string | undefined =>
  state.auth.data.name;

export const selectAuthNotice = (state: AppRootStateType): string => state.auth.notice;

export const selectAuthStatus = (state: AppRootStateType): StatusType =>
  state.auth.status;
