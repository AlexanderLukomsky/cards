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
    }
})
export const authReducer = slice.reducer
// export const authReducer = (state: AuthStateType = authInitState, action: ActionType): AuthStateType => {
//     switch (action.type) {
//         case 'auth/SET-LOGIN': return { ...state, authData: action.payload.data }
//         case 'auth/LOGOUT': return { ...state, isAuth: false }
//         case 'auth/SET-IS-AUTH': return { ...state, isAuth: action.payload.isAuth }
//         default: return state
//     }
// }
//AC
// export const setLoginAC = (data: loginResponseType) => (
//     {
//         type: 'auth/SET-LOGIN',
//         payload: { data }
//     } as const
// )
// export const logoutAC = () => (
//     {
//         type: 'auth/LOGOUT'
//     } as const
// )
// export const setIsAuthAC = (isAuth: boolean) => (
//     {
//         type: 'auth/SET-IS-AUTH',
//         payload: { isAuth }
//     } as const
// )
export const { setLoginAC } = slice.actions
export const { logoutAC } = slice.actions
export const { setIsAuthAC } = slice.actions
//TC
export const setLoginTC = (data: authDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.auth(data)
        dispatch(setLoginAC({ data: res.data }))
        dispatch(setIsAuthAC({ isAuth: true }))
        dispatch(setAppStatusAC('success'))
    } catch (e) {
        dispatch(setAppStatusAC('error'))
        alert((e as AxiosError<{ error: string }, any>).response?.data.error)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    try {
        await authAPI.logout()
        dispatch(setAppStatusAC('success'))
        dispatch(logoutAC())
    } catch (e: any) {
        const errorMessage = (e as AxiosError<{ error: string }, any>).response ? e.response.data.error : e.message
        dispatch(setAppStatusAC('error'))
        handleAppError(errorMessage, dispatch)
    }
}


type ActionType =
    | ReturnType<typeof setLoginAC>
    | ReturnType<typeof logoutAC>
    | ReturnType<typeof setIsAuthAC>

export type AuthStateType = {
    authData: loginResponseType
    isAuth: boolean
}

