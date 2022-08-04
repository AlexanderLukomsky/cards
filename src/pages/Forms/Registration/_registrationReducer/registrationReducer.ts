import { AxiosError } from "axios"
import { authAPI, authDataType } from "../../../../api/auth-api"
import { AppThunk } from "../../../../store/store"
import { handleAppError } from "../../../../utils/utils"
import { setAppStatusAC } from '../../../../store/reducers/appReducer';

const initState = {
    isReg: false
}
export const registrationReducer = (state: InitStateType = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case 'reg/SET-IS-REG': return { ...state, isReg: action.payload.isReg }
        default: return state
    }
}
export const setIsRegAC = (isReg: boolean) => (
    {
        type: 'reg/SET-IS-REG',
        payload: { isReg }
    } as const
)
export const registrationTC = (data: authDataType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({ appStatus: 'loading' }))
        await authAPI.registration(data)
        setTimeout(() => { dispatch(setIsRegAC(true)) }, 1000)
        setTimeout(() => { dispatch(setAppStatusAC({ appStatus: 'success' })) }, 1500)

    } catch (e: any) {
        const errorMessage = (e as AxiosError<{ error: string }, any>).response ? e.response.data.error : e.message
        dispatch(setAppStatusAC({ appStatus: 'error' }))
        handleAppError(errorMessage, dispatch)
        dispatch(setIsRegAC(false))
    }
}
type InitStateType = typeof initState
type ActionType = ReturnType<typeof setIsRegAC>