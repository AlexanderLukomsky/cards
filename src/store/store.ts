import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, combineReducers } from "redux";
import { appReducer } from "./reducers/appReducer";
import { authReducer } from "./reducers/authReducer";
import { newPassReducer } from "./reducers/newPassReducer";
import { passRecoveryReducer } from "./reducers/passRecoveryReducer";
import { profileReducer } from "./reducers/profileReducer";
import { registrationReducer } from "./reducers/registrationReducer";

//store
export const rootReducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    newPass: newPassReducer,
    passRecovery: passRecoveryReducer,
    profile: profileReducer,
    registration: registrationReducer
})
export const store = configureStore({
    reducer: rootReducers
})
//custom useDispatch and useSelector
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector
export const useAppDispatch: () => AppDispatchType = useDispatch
//types Root Store, Dispatch, Thunk, Actions
export type AppRootStoreType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStoreType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AppActionsType>
type AppActionsType =
    | AnyAction