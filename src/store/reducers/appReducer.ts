import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { authAPI } from './../../api/auth-api';
import { AppThunk } from "../store"
import { setIsAuthAC, setLoginAC } from './authReducer';
type AppStatusType = "initial" | "loading" | "success" | "error"
const initialState = {
    appStatus: 'initial',
    error: '',
    isInitializedApp: false
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ appStatus: AppStatusType }>) {
            return { ...state, appStatus: action.payload.appStatus }
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
            return { ...state, error: action.payload.error }
        },
        setIsInitializedAppAC(state, action: PayloadAction<{ isInitializedApp: boolean }>) {
            return { ...state, isInitializedApp: action.payload.isInitializedApp }
        },
    }
})
export const { setAppStatusAC, setAppErrorAC, setIsInitializedAppAC } = slice.actions

export const appReducer = slice.reducer

export const setIsInitializedAppTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({ appStatus: 'loading' }))
        const res = await authAPI.authMe()
        dispatch(setIsAuthAC({ isAuth: true }))
        dispatch(setLoginAC({ data: res.data }))
        dispatch(setAppStatusAC({ appStatus: 'success' }))
    } catch (e) {
        dispatch(setAppStatusAC({ appStatus: 'error' }))
    } finally {
        setTimeout(() => { dispatch(setIsInitializedAppAC({ isInitializedApp: true })) }, 200)
    }
}
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAppType = ReturnType<typeof setIsInitializedAppAC>
