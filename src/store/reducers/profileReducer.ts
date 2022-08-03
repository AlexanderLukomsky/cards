import { StatusType } from '../../_types/types';
import { authAPI, loginResponseType } from './../../api/auth-api';
import { AppThunk } from './../store';
import { authInitState, AuthStateType, setLoginAC } from './authReducer';
const initState: profileStateType = { ...authInitState, status: 'initial', isInitialized: false }
export const profileReducer = (state: profileStateType = initState, action: ActionType): profileStateType => {
    switch (action.type) {
        case 'auth/SET-LOGIN': return { ...state, authData: action.payload.data, status: 'initial' }
        case 'profile/UPDATE-PROFILE': return { ...state, authData: { ...state.authData, name: action.payload.name } }
        case 'profile/SET-STATUS': return { ...state, status: action.payload.status }
        default: return state
    }
}
const updateProfileAC = (name: string) => (
    {
        type: 'profile/UPDATE-PROFILE',
        payload: { name }
    } as const
)
const setProfileStatusAC = (status: StatusType) => (
    {
        type: 'profile/SET-STATUS',
        payload: { status }
    } as const
)
export const updateProfileTC = (model: { name?: string, avatar?: string }): AppThunk => async (dispatch) => {
    console.log(model);
    try {
        dispatch(setProfileStatusAC('loading'))
        const res = await authAPI.update(model)
        dispatch(updateProfileAC(res.data.updatedUser.name))
    } finally {
        dispatch(setProfileStatusAC('initial'))
    }

}
type profileStateType = {
    authData: loginResponseType
    status: StatusType,
    isInitialized: boolean
}
type ActionType =
    | ReturnType<typeof setLoginAC>
    | ReturnType<typeof updateProfileAC>
    | ReturnType<typeof setProfileStatusAC>
