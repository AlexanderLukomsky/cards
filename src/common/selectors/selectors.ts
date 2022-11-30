import { StatusType } from 'common/types';
import { AppRootStateType } from 'store';

export const selectIsInitializedApp = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const selectAppStatus = (state: AppRootStateType): StatusType => state.app.status;
export const selectIsAuth = (state: AppRootStateType): boolean => state.auth.isAuth;

export const selectUserAvatar = (state: AppRootStateType): string =>
  state.auth.data.avatar;
export const selectUserName = (state: AppRootStateType): string => state.auth.data.name;
