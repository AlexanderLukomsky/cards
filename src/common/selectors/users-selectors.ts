import { StatusType } from 'common/types';
import { AppRootStateType } from 'store';
import { UserType } from 'store/reducers/users-reducer';

export const selectUsers = (state: AppRootStateType): UserType[] =>
  state.users.data.users;

export const selectUsersPage = (state: AppRootStateType): number => state.users.data.page;

export const selectUsersPageCount = (state: AppRootStateType): number =>
  state.users.data.pageCount;

export const selectUsersTotalCount = (state: AppRootStateType): number =>
  state.users.data.usersTotalCount;

export const selectUsersStatus = (state: AppRootStateType): StatusType =>
  state.users.status;

export const selectUsersIsInitialized = (state: AppRootStateType): boolean =>
  state.users.isInitialized;

export const selectUsersNotice = (state: AppRootStateType): string => state.users.notice;
