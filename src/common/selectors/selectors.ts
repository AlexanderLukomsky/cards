import { Nullable } from '../types/types';

import { StatusType } from 'common/types';
import { AppRootStateType } from 'store';
import { CardType } from 'store/reducers/cards-reducer';
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
  state.packs.data.minCardsCount;

export const selectMaxCardsCount = (state: AppRootStateType): number =>
  state.packs.data.maxCardsCount;

export const selectSearchPacksName = (state: AppRootStateType): Nullable<string> =>
  state.packs.params.searchPacksName;

export const selectPacksParamsUserId = (state: AppRootStateType): Nullable<string> =>
  state.packs.params.user_id;

export const selectLearningIsInitialized = (state: AppRootStateType): boolean =>
  state.learning.isInitialized;

export const selectLearningStatus = (state: AppRootStateType): StatusType =>
  state.learning.status;

export const selectLearningNotice = (state: AppRootStateType): string =>
  state.learning.notice;

export const selectLearningCard = (state: AppRootStateType): CardType[] =>
  state.learning.data;

export const selectIsOrderedSort = (state: AppRootStateType): boolean =>
  state.learning.isOrderedSort;

export const selectLearningPackName = (state: AppRootStateType): string =>
  state.learning.packName;

export const selectCardsStatus = (state: AppRootStateType): StatusType =>
  state.cards.status;

export const selectCardsPackUserId = (state: AppRootStateType): string =>
  state.cards.data.packUserId;

export const selectCardsNotice = (state: AppRootStateType): string => state.cards.notice;

export const selectCardsIsInitialized = (state: AppRootStateType): boolean =>
  state.cards.isInitialized;

export const selectCardsPackName = (state: AppRootStateType): string =>
  state.cards.data.packName;

export const selectCardsPackDeckCover = (state: AppRootStateType): Nullable<string> =>
  state.cards.data.packDeckCover;

export const selectCardsTotalCount = (state: AppRootStateType): number =>
  state.cards.data.cardsTotalCount;

export const selectCardsPageCount = (state: AppRootStateType): number =>
  state.cards.data.pageCount;

export const selectCardsCurrentPage = (state: AppRootStateType): number =>
  state.cards.data.page;

export const selectCardsFromData = (state: AppRootStateType): CardType[] =>
  state.cards.data.cards;

export const selectSearchCardName = (state: AppRootStateType): Nullable<string> =>
  state.cards.searchQuestionName;
