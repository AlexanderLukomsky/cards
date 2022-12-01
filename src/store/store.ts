import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';

import { appReducer, authReducer, packsReducer } from './reducers';
import { AppRootStateType } from './type';

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

// types Root Store, Dispatch, Thunk, Actions

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
type AppActionsType = AnyAction;
