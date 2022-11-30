import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, combineReducers } from 'redux';

import { appReducer, authReducer } from './reducers';
import { AppDispatchType, AppRootStateType } from './type';

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  // packs: packsReducer,
  // profile: profileReducer,
  // cards: cardsReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});
// useDispatch and useSelector
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch: () => AppDispatchType = useDispatch;
// types Root Store, Dispatch, Thunk, Actions

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
type AppActionsType = AnyAction;
