import { AnyAction, combineReducers } from "redux";
import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "../App/reducers/appReducer";
import { authReducer } from "../App/reducers/authReducer";
import { packsReducer } from "../pages/PacksPage/reducer/packsReducer";
import { profileReducer } from "../pages/Profile/reducer/profileReducer";
const rootReducers = combineReducers({
   app: appReducer,
   auth: authReducer,
   packs: packsReducer,
   profile: profileReducer
})
export const store = configureStore({
   reducer: rootReducers
})
//useDispatch and useSelector
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch: () => AppDispatchType = useDispatch
//types Root Store, Dispatch, Thunk, Actions
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
type AppActionsType =
   | AnyAction
   // | PacksActionType