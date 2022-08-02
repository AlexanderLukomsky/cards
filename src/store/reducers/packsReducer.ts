import { PacksDataType } from './../../api/packs-api';
import { packsAPI } from '../../api/packs-api';
import { AppThunk } from '../store';
import { StatusType } from '../../_types/types';
export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return { ...state, ...action.payload }
        case 'packs/IS-INITIALIZED':
            return { ...state, isInitialized: action.payload.isInitialized }
        case 'packs/CHANGE-PAGE':
            return { ...state, data: { ...state.data, page: action.payload.page } }
        case 'packs/SET-STATUS': return { ...state, status: action.payload.status }
        case 'packs/SET-PAGE-COUNT':
            return { ...state, data: { ...state.data, pageCount: action.payload.pageCount, page: 1 } }
        case 'packs/IS-MY-PACKS':
            return { ...state, isMyPacks: action.paylaod.isMyPacks }
        case 'packs/UPDATED-PACK': return { ...state, updatedPacks: { updateStatus: action.payload.updateStatus } }
        default: return state
    }
}
// AC 
const setPacksAC = (payload: { data: PacksDataType, params: { min: number, max: number } }) => (
    {
        type: 'packs/SET-PACKS',
        payload
    } as const
)
const setIsInitializedPacksAC = (payload: { isInitialized: boolean }) => (
    {
        type: 'packs/IS-INITIALIZED',
        payload
    } as const
)
export const setStatusAC = (status: StatusType) => (
    { type: 'packs/SET-STATUS', payload: { status } } as const
)

export const setPageCountAC = (pageCount: number) => (
    {
        type: 'packs/SET-PAGE-COUNT',
        payload: { pageCount }
    } as const
)
export const changePacksPageAC = (page: number) => (
    {
        type: 'packs/CHANGE-PAGE',
        payload: { page }
    } as const
)
export const setIsMyPacksAC = (isMyPacks: boolean) => (
    {
        type: 'packs/IS-MY-PACKS',
        paylaod: { isMyPacks }
    } as const
)
export const updatePacksAC = (updateStatus: StatusType) => (
    {
        type: 'packs/UPDATED-PACK',
        payload: { updateStatus }
    } as const
)
// TC
export const getPacksTC = (requestModel?: RequestModelType): AppThunk => async (dispatch, getState) => {
    dispatch(setIsInitializedPacksAC({ isInitialized: false }))
    const state = getState()
    const requestParams = {
        page: state.packs.data.page,
        pageCount: state.packs.data.pageCount,
        min: state.packs.params.min,
        max: state.packs.params.max,
        user_id: state.packs.isMyPacks ? state.auth._id : null,
        ...requestModel
    }
    const params = requestModel?.max ?
        { min: requestModel.min!, max: requestModel.max } :
        { min: initState.params.min, max: initState.params.max }
    try {
        dispatch(setStatusAC('loading'))
        const res = await packsAPI.getPacks(requestParams)
        dispatch(setPacksAC({ data: res.data, params }))
    } finally {
        dispatch(setIsInitializedPacksAC({ isInitialized: true }))
        dispatch(setStatusAC('initial'))
    }
}
export const createPackTC = (packName: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatusAC('loading'))
        await packsAPI.createPack(packName)
        dispatch(updatePacksAC('success'))
    } finally {
        dispatch(setStatusAC('initial'))
        dispatch(updatePacksAC('initial'))
    }
}
export const deletePackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatusAC('loading'))
        await packsAPI.deletePack(id)
        dispatch(updatePacksAC('success'))
    } finally {
        dispatch(setStatusAC('initial'))
        dispatch(updatePacksAC('initial'))
    }
}
export const editPackNameTC = ({ _id, name }: { _id: string, name: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatusAC('loading'))
        await packsAPI.editPackName({ _id, name })
        dispatch(updatePacksAC('success'))
    } finally {
        dispatch(setStatusAC('initial'))
        dispatch(updatePacksAC('initial'))
    }
}
export type PacksActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setIsInitializedPacksAC>
    | ReturnType<typeof changePacksPageAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setIsMyPacksAC>
    | ReturnType<typeof updatePacksAC>

const initState = {
    isInitialized: false,
    data: {
        page: 1,
        pageCount: 5,
        cardPacksTotalCount: 5,
    } as PacksDataType,
    params: {
        min: 0,
        max: 110
    },
    status: 'idle' as StatusType,
    isMyPacks: false,
    updatedPacks: { updateStatus: 'initial' as StatusType }
}
type InitStateType = typeof initState

type RequestModelType = {
    pageCount?: number
    page?: number
    min?: number
    max?: number
    packName?: string,
    user_id?: string
}