import { authAPI } from './../../api/auth-api';
import { AppThunk } from "../store"
import { setIsAuthAC, setLoginAC } from './authReducer';
type AppStatusType = "initial" | "loading" | "success" | "error"
const initialState: InitialStateType = {
    appStatus: 'initial',
    error: '',
    isInitializedApp: false
}
type InitialStateType = {
    appStatus: AppStatusType
    error: string
    isInitializedApp: boolean
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-APP-STATUS': return { ...state, appStatus: action.payload.appStatus }
        case 'app/Error': return { ...state, error: action.payload.error }
        case 'app/IS-INITIALIZED': return { ...state, isInitializedApp: action.payload.isInitializedApp }
        default: return state
    }
}

export const authAC = (isAuth: boolean) => (
    {
        type: 'app/IS-AUTH',
        payload: { isAuth }
    } as const
)
export const setAppStatusAC = (appStatus: AppStatusType) => (
    {
        type: 'app/SET-APP-STATUS',
        payload: { appStatus }
    } as const
)
export const setAppErrorAC = (error: string) => (
    {
        type: 'app/Error',
        payload: { error }
    } as const
)
export const setIsInitializedAppAC = (isInitializedApp: boolean) => (

    {
        type: 'app/IS-INITIALIZED',
        payload: { isInitializedApp }
    } as const
)
export const setIsInitializedAppTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.authMe()
        dispatch(setIsAuthAC(true))
        dispatch(setLoginAC(res.data))
        dispatch(setAppStatusAC('success'))
    } catch (e) {
        dispatch(setAppStatusAC('error'))
    } finally {
        setTimeout(() => { dispatch(setIsInitializedAppAC(true)) }, 200)
    }
}
type AppActionType =
    | ReturnType<typeof setAppStatusAC>
    | SetAppErrorType
    | SetIsInitializedAppType
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAppType = ReturnType<typeof setIsInitializedAppAC>
