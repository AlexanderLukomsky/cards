import { packsAPI, PacksDataType } from './../../../api/packs-api';
import { StatusType } from '../../../_types/types';
import { authAPI, loginResponseType } from '../../../api/auth-api';
import { AppThunk } from '../../../store/store';
import { authInitState, setLoginAC } from '../../../store/reducers/authReducer';

export const profileReducer = (state: profileStateType = initState, action: ActionType): profileStateType => {
    switch (action.type) {
        //  case 'auth/SET-LOGIN': return { ...state, authData: action.payload.data, status: 'initial' }
        //  case 'profile/UPDATE-PROFILE': return { ...state, authData: { ...state.authData, name: action.payload.name } }
        //    case 'profile/SET-STATUS': return { ...state, status: action.payload.status }
        //   case 'profile/SET-PACKS': return { ...state, packs: action.payload.packs, isInitializedPacks: true }
        //  case 'profile/SET-IS-INITIALIZED': return { ...state, isInitializedPacks: action.payload.isInitializedPacks }
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
const setPacksAC = (packs: PacksDataType) => (
    {
        type: 'profile/SET-PACKS',
        payload: { packs }
    } as const
)
export const setIsInitializedProfile = (isInitializedPacks: boolean) => (
    {
        type: 'profile/SET-IS-INITIALIZED',
        payload: { isInitializedPacks }
    } as const
)
//TC
export const updateProfileTC = (model: { name?: string, avatar?: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setProfileStatusAC('loading'))
        const res = await authAPI.update(model)
        dispatch(updateProfileAC(res.data.updatedUser.name))
    } finally {
        dispatch(setProfileStatusAC('initial'))
    }

}
export const getProfilePacksTC = (user_id: string): AppThunk => async (dispatch, getState) => {
    try {
        const res = await packsAPI.getPacks({ user_id })
        dispatch(setPacksAC(res.data))
    } finally {

    }
}
const initState: profileStateType = {
    ...authInitState, status: 'initial', isInitializedPacks: false,
    packs: { page: 1, pageCount: 5, cardPacksTotalCount: 5 } as PacksDataType
}
type profileStateType = {
    packs: PacksDataType,
    authData: loginResponseType
    status: StatusType,
    isInitializedPacks: boolean
}
type ActionType =
    | ReturnType<typeof setLoginAC>
    | ReturnType<typeof updateProfileAC>
    | ReturnType<typeof setProfileStatusAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setIsInitializedProfile>
