import { authApi } from './../../api/auth-api';
import { AppThunk } from "../store"
import { setLoginAC } from './authReducer';
type AppStatusType = "initial" | "loading" | "success" | "error"
const initialState: InitialStateType = {
    appStatus: 'initial',
    isAuth: false,
    error: '',
    isInitializedApp: false
}
type InitialStateType = {
    appStatus: AppStatusType
    isAuth: boolean
    error: string
    isInitializedApp: boolean
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/IS-AUTH': return { ...state, isAuth: action.payload.isAuth }
        case 'app/SET-APP-STATUS': return { ...state, appStatus: action.payload.appStatus }
        case 'app/Error': return { ...state, error: action.payload.error }
        case 'app/IS-INITIALIZED': return { ...state, isInitializedApp: action.payload.isInitializedApp }
        default: return state
    }
}

export const auth = (isAuth: boolean) => (
    {
        type: 'app/IS-AUTH',
        payload: { isAuth }
    } as const
)
export const setAppStatus = (appStatus: AppStatusType) => (
    {
        type: 'app/SET-APP-STATUS',
        payload: { appStatus }
    } as const
)
export const setAppError = (error: string) => (
    {
        type: 'app/Error',
        payload: { error }
    } as const
)
export const setIsInitializedApp = (isInitializedApp: boolean) => (
    {
        type: 'app/IS-INITIALIZED',
        payload: { isInitializedApp }
    } as const
)
export const setIsInitializedAppTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const res = await authApi.authMe()
        dispatch(auth(true))
        dispatch(setLoginAC(res.data))
        dispatch(setAppStatus('success'))
    } catch (e) {
        dispatch(setAppStatus('error'))
    } finally {
        setTimeout(() => { dispatch(setIsInitializedApp(true)) }, 1500)
    }
}
type AppActionType =
    | ReturnType<typeof auth>
    | ReturnType<typeof setAppStatus>
    | SetAppErrorType
    | SetIsInitializedAppType
export type SetAppErrorType = ReturnType<typeof setAppError>
export type SetIsInitializedAppType = ReturnType<typeof setIsInitializedApp>
