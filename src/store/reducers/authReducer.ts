import { AxiosError } from "axios"
import { authAPI, authDataType } from "../../api/auth-api"
import { handleAppError } from "../../utils/utils"
import { AppThunk } from "../store"
import { auth, setAppStatus } from "./appReducer"

export const authInitState = {
    created: '',
    email: "",
    isAdmin: false,
    name: "",
    publicCardPacksCount: 0,
    rememberMe: false,
    token: "",
    tokenDeathTime: 0,
    updated: '',
    verified: false,
    __v: 0,
    _id: "",
}
export type AuthStateType = typeof authInitState & {
    avatar?: string
}
export const authReducer = (state: AuthStateType = authInitState, action: ActionType): AuthStateType => {
    switch (action.type) {
        case 'auth/SET-LOGIN': return { ...state, ...action.payload.data }
        default: return state
    }
}
//AC
export const setLoginAC = (data: AuthStateType) => (
    {
        type: 'auth/SET-LOGIN',
        payload: { data }
    } as const
)
export const logoutAC = () => (
    {
        type: 'auth/LOGOUT'
    } as const
)
//TC
export const loginTC = (data: authDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.auth(data)
        dispatch(setLoginAC(res.data))
        dispatch(setAppStatus('success'))
        dispatch(auth(true))
    } catch (e) {
        dispatch(setAppStatus('error'))
        alert((e as AxiosError<{ error: string }, any>).response?.data.error)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        await authAPI.logout()
        dispatch(setAppStatus('success'))
        dispatch(auth(false))
    } catch (e: any) {
        const errorMessage = (e as AxiosError<{ error: string }, any>).response ? e.response.data.error : e.message
        dispatch(setAppStatus('error'))
        handleAppError(errorMessage, dispatch)
    }
}


type ActionType = { type: any } & ReturnType<typeof setLoginAC>