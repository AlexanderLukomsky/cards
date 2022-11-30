import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';

import { appReducer, authReducer } from './reducers';
import { AppRootStateType } from './type';

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
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
