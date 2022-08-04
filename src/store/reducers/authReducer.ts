import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { authAPI, authDataType, loginResponseType } from "../../api/auth-api"
import { handleAppError } from "../../utils/utils"
import { AppThunk } from "../store"
import { setAppStatusAC } from "./appReducer"
export const authInitState = {
    authData: {} as loginResponseType,
    isAuth: false
}
const slice = createSlice({
    name: 'auth',
    initialState: { authData: {} as loginResponseType, isAuth: false },
    reducers: {
        setLoginAC(state, action: PayloadAction<{ data: loginResponseType }>) {
            console.log(action.payload.data);
            state.authData = action.payload.data
        },
        logoutAC(state) {
            state.isAuth = false
        },
        setIsAuthAC(state, action: PayloadAction<{ isAuth: boolean }>) {
            state.isAuth = action.payload.isAuth
        }
    },
    extraReducers: {
    }
})
export const authReducer = slice.reducer
export const { setLoginAC, logoutAC, setIsAuthAC } = slice.actions
//TC
export const setLoginTC = (data: authDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC({ appStatus: 'loading' }))
    try {
        const res = await authAPI.auth(data)
        dispatch(setLoginAC({ data: res.data }))
        dispatch(setIsAuthAC({ isAuth: true }))
        dispatch(setAppStatusAC({ appStatus: 'success' }))
    } catch (e) {
        dispatch(setAppStatusAC({ appStatus: 'error' }))
        alert((e as AxiosError<{ error: string }, any>).response?.data.error)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        await authAPI.logout()
        dispatch(setAppStatusAC({ appStatus: 'success' }))
        dispatch(logoutAC())
    } catch (e: any) {
        const errorMessage = (e as AxiosError<{ error: string }, any>).response ? e.response.data.error : e.message
        dispatch(setAppStatusAC({ appStatus: 'error' }))
        handleAppError(errorMessage, dispatch)
    }
}
export type AuthStateType = {
    authData: loginResponseType
    isAuth: boolean
}

