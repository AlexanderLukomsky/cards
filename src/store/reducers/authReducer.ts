import { AxiosError, AxiosResponse } from "axios"
import { authApi, authDataType } from "../../api/auth-api"
import { handleAppError } from "../../utils/utils"
import { AppThunk } from "../store"
import { auth, setAppStatus } from "./appReducer"

const initState: loginStateType = ''
export const authReducer = (state: loginStateType = initState, action: ActionType): loginStateType => {
    switch (action.type) {
        default: return state
    }
}

type loginStateType = ''
type ActionType = { type: any }

export const authTC = (data: authDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await authApi.auth(data)
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
        const res = await authApi.registration(data)
        dispatch(setAppStatus('success'))
    } catch (e: any) {
        const errorMessage = (e as AxiosError<{ error: string }, any>).response ? e.response.data.error : e.message
        dispatch(setAppStatus('error'))
        handleAppError(errorMessage, dispatch)
    }
}