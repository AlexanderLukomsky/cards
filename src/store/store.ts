import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { loginReducer } from "./reducers/loginReducer";
import { newPassReducer } from "./reducers/newPassReducer";
import { passRecoveryReducer } from "./reducers/passRecoveryReducer";
import { profileReducer } from "./reducers/profileReducer";
import { registrationReducer } from "./reducers/registrationReducer";

const rootReducers = combineReducers({
    login: loginReducer,
    newPass: newPassReducer,
    passRecovery: passRecoveryReducer,
    profile: profileReducer,
    registration: registrationReducer
})
export const store = configureStore({
    reducer: rootReducers
})