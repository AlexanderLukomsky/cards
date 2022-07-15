import { authApi, authDataType } from "../../api/auth-api"
import { AppThunk } from "../store"
import { auth, setAppStatus } from "./appReducer"

const initState: loginStateType = ''
export const loginReducer = (state: loginStateType = initState, action: ActionType): loginStateType => {
    switch (action.type) {
        default: return state
    }
}

type loginStateType = ''
type ActionType = { type: any }

export const authTC = (data: authDataType): AppThunk => async (dispath) => {
    dispath(setAppStatus('loading'))
    try {
        const res = await authApi.auth(data)
        dispath(setAppStatus('success'))
        dispath(auth(true))
    } catch (e) {
        dispath(setAppStatus('error'))
        alert('user not found')
    }
}

