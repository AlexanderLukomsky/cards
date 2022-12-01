import { Nullable } from '../types/types';

import { StatusType } from 'common/types';
import { AppRootStateType } from 'store';
import { PacksStateType, SortType } from 'store/reducers/packs-reducer';

export const selectIsInitializedApp = (state: AppRootStateType): boolean =>
  state.app.isInitialized;

export const selectAppStatus = (state: AppRootStateType): StatusType => state.app.status;

export const selectIsAuth = (state: AppRootStateType): boolean => state.auth.isAuth;

export const selectAuthAvatar = (state: AppRootStateType): undefined | string =>
  state.auth.data.avatar;

export const selectAuthUserId = (state: AppRootStateType): string => state.auth.data._id;

export const selectAuthNotice = (state: AppRootStateType): string => state.auth.notice;

export const selectAuthStatus = (state: AppRootStateType): StatusType =>
  state.auth.status;

export const selectAuthName = (state: AppRootStateType): string => state.auth.data.name;

export const selectAuthEmail = (state: AppRootStateType): string => state.auth.data.email;

export const selectUserAvatar = (state: AppRootStateType): string | undefined =>
  state.auth.data.avatar;

export const selectUserName = (state: AppRootStateType): string | undefined =>
  state.auth.data.name;

export const selectPacks = (state: AppRootStateType): PacksStateType => state.packs;

export const selectSortPacks = (state: AppRootStateType): SortType =>
  state.packs.params.sortPacks;

export const selectMinCardsCount = (state: AppRootStateType): number =>
  state.packs.data.maxCardsCount;

export const selectMaxCardsCount = (state: AppRootStateType): number =>
  state.packs.data.maxCardsCount;

export const selectSearchPacksName = (state: AppRootStateType): Nullable<string> =>
  state.packs.params.searchPacksName;

export const selectPacksParamsUserId = (state: AppRootStateType): Nullable<string> =>
  state.packs.params.user_id;

export const selectProfileStatus = (state: AppRootStateType): StatusType =>
  state.profile.status;

export const selectProfileNotice = (state: AppRootStateType): string =>
  state.profile.notice;
