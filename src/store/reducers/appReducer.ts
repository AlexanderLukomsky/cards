import { AppThunk } from "../store"
type AppStatusType = "initial" | "loading" | "success" | "error"
const initialState: InitialStateType = {
    appStatus: 'initial',
    isAuth: false,
    error: ''
}
type InitialStateType = {
    appStatus: AppStatusType
    isAuth: boolean
    error: string
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/IS-AUTH': return { ...state, isAuth: action.payload.isAuth }
        case 'app/SET-APP-STATUS': return { ...state, appStatus: action.payload.appStatus }
        case 'app/Error': return { ...state, error: action.payload.error }
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
type AppActionType =
    | ReturnType<typeof auth>
    | ReturnType<typeof setAppStatus>
    | SetAppErrorType

export type SetAppErrorType = ReturnType<typeof setAppError>
