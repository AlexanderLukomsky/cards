import { AxiosError } from "axios"
import { authApi, authDataType } from "../../api/auth-api"
import { handleAppError } from "../../utils/utils"
import { AppThunk } from "../store"
import { auth, setAppStatus } from "./appReducer"

const initState = {
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
type AuthStateType = typeof initState & {
    avatar?: string
}
export const authReducer = (state: AuthStateType = initState, action: ActionType): AuthStateType => {
    switch (action.type) {
        case 'auth/SET-LOGIN': return { ...state, ...action.payload.data }
        default: return state
    }
}

export const setLoginAC = (data: AuthStateType) => {
    return {
        type: 'auth/SET-LOGIN',
        payload: { data }
    } as const
}
export const logoutAC = () => {
    return {
        type: 'auth/LOGOUT'
    } as const
}
export const loginTC = (data: authDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authApi.auth(data)
        dispatch(setLoginAC(res.data))
        console.log(res.data);
        dispatch(setAppStatus('success'))
        dispatch(auth(true))
    } catch (e) {
        dispatch(setAppStatus('error'))
        alert((e as AxiosError<{ error: string }, any>).response?.data.error)
    }
}
export const registrationTC = (data: authDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await authApi.registration(data)
        dispatch(setAppStatus('success'))
    } catch (e: any) {
        const errorMessage = (e as AxiosError<{ error: string }, any>).response ? e.response.data.error : e.message
        dispatch(setAppStatus('error'))
        handleAppError(errorMessage, dispatch)
    }
}
export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        await authApi.logout()
        dispatch(setAppStatus('success'))
        dispatch(auth(false))
    } catch (e: any) {
        const errorMessage = (e as AxiosError<{ error: string }, any>).response ? e.response.data.error : e.message
        dispatch(setAppStatus('error'))
        handleAppError(errorMessage, dispatch)
    }
}


type ActionType = { type: any } & ReturnType<typeof setLoginAC>