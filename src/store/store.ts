import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';

import {
  appReducer,
  authReducer,
  cardsReducer,
  learningReducer,
  packsReducer,
  usersReducer,
} from './reducers';
import { AppRootStateType } from './type';

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  learning: learningReducer,
  cards: cardsReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;
type AppActionsType = AnyAction;
