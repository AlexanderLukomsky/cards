import { AxiosError } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { PacksDataType } from '../../../api/packs-api';
import { packsAPI } from '../../../api/packs-api';
import { AppThunk } from '../../../store/store';
import { handleError } from '../../../utils/utils';
import { StatusType } from '../../../_types/types';



export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return { ...state, ...action.payload }
        case 'packs/IS-INITIALIZED':
            return { ...state, isInitialized: action.payload.isInitialized }
        case 'packs/CHANGE-PAGE':
            return { ...state, requestParams: { ...state.requestParams, ...action.payload } }
        case 'packs/SET-STATUS': return { ...state, status: action.payload.status }
        case 'packs/SET-PAGE-COUNT':
            return { ...state, requestParams: { ...state.requestParams, ...action.payload } }
        case 'packs/SET-USER-ID-FOR-FIND-PACKS':
            return { ...state, requestParams: { ...state.requestParams, ...action.payload, min: 0, max: 110 } }
        case 'packs/UPDATED-PACK': return { ...state, updatedPacks: { updateStatus: action.payload.updateStatus } }
        case 'packs/EDIT-SEATCH-PACK-NAME-VALUE': return { ...state, requestParams: { ...state.requestParams, ...action.payload } }
        case 'packs/SET-SORT-PARAMS': return { ...state, requestParams: { ...state.requestParams, ...action.payload } }
        default: return state
    }
}
// AC 
const setPacksAC = (payload: { data: PacksDataType }) => (
    {
        type: 'packs/SET-PACKS',
        payload
    } as const
)
export const setIsInitializedPacksAC = (payload: { isInitialized: boolean }) => (
    {
        type: 'packs/IS-INITIALIZED',
        payload
    } as const
)
export const setPacksStatusAC = (status: StatusType) => (
    { type: 'packs/SET-STATUS', payload: { status } } as const
)
export const setSortParamsAC = ({ min, max }: { min: number, max: number }) => (
    {
        type: 'packs/SET-SORT-PARAMS',
        payload: { min, max }
    } as const
)
export const setPageCountAC = (pageCount: number) => (
    {
        type: 'packs/SET-PAGE-COUNT',
        payload: { pageCount }
    } as const
)
export const changePacksPageAC = ({ page }: { page: number }) => (
    {
        type: 'packs/CHANGE-PAGE',
        payload: { page }
    } as const
)
export const setUserIdForFindPacks = ({ user_id }: { user_id: string | null }) => (
    {
        type: 'packs/SET-USER-ID-FOR-FIND-PACKS',
        payload: { user_id }
    } as const
)
export const updatePacksAC = (updateStatus: StatusType) => (
    {
        type: 'packs/UPDATED-PACK',
        payload: { updateStatus }
    } as const
)
export const editSearchPackNameValueAC = (searchPackName: string | null) => (
    {
        type: 'packs/EDIT-SEATCH-PACK-NAME-VALUE',
        payload: { searchPackName }
    } as const
)
// TC
export const getPacksTC = (requestModel?: RequestModelType): AppThunk => async (dispatch, getState) => {
    const state = getState().packs
    const requestParams = {
        page: state.requestParams.page,
        pageCount: state.requestParams.pageCount,
        min: (state.requestParams.min === 0 && state.requestParams.max === 110) ? null : state.requestParams.min,
        max: (state.requestParams.min === 0 && state.requestParams.max === 110) ? null : state.requestParams.max,
        user_id: state.requestParams.user_id,
        packName: state.requestParams.searchPackName,
        ...requestModel
    }
    try {
        dispatch(setIsInitializedPacksAC({ isInitialized: false }))
        const res = await packsAPI.getPacks(requestParams)
        dispatch(setPacksAC({ data: res.data }))
        dispatch(setIsInitializedPacksAC({ isInitialized: true }))
    } catch (e: any) {
        handleError(e, dispatch, setPacksStatusAC)
    }
}
export const createPackTC = (packName: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setPacksStatusAC('loading'))
        await packsAPI.createPack(packName)
        dispatch(changePacksPageAC({ page: 1 }))
    } catch (e) {
        handleError(e, dispatch)
        dispatch(updatePacksAC('initial'))
    } finally {
        dispatch(setPacksStatusAC('initial'))
    }
}
export const deletePackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setPacksStatusAC('loading'))
        await packsAPI.deletePack(id)
        dispatch(updatePacksAC('success'))
    } catch (e) {
        handleError(e, dispatch)
        dispatch(updatePacksAC('initial'))
    } finally {
        dispatch(setPacksStatusAC('initial'))
    }
}
export const editPackNameTC = ({ _id, name }: { _id: string, name: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setPacksStatusAC('loading'))
        await packsAPI.editPackName({ _id, name })
        dispatch(updatePacksAC('success'))
    } catch (e) {
        handleError(e, dispatch)
        dispatch(updatePacksAC('initial'))
    } finally {
        dispatch(setPacksStatusAC('initial'))
    }
}

export type PacksActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setIsInitializedPacksAC>
    | ReturnType<typeof changePacksPageAC>
    | SetPacksStatusACType
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setUserIdForFindPacks>
    | ReturnType<typeof updatePacksAC>
    | ReturnType<typeof editSearchPackNameValueAC>
    | ReturnType<typeof setSortParamsAC>
export type SetPacksStatusACType = ReturnType<typeof setPacksStatusAC>
const initState = {
    isInitialized: false,
    data: {
        page: 1,
        pageCount: 5,
        cardPacksTotalCount: 5
    } as PacksDataType,
    requestParams: {
        page: 1,
        pageCount: 5,
        min: 0,
        max: 110,
        user_id: null as string | null,
        searchPackName: null as string | null
    },
    status: 'idle' as StatusType,
    updatedPacks: { updateStatus: 'initial' as StatusType },

}
type InitStateType = typeof initState

type RequestModelType = {
    pageCount?: number
    page?: number
    min?: number
    max?: number
    packName?: string | null,
    user_id?: string | null
}

/// before go to toolkit
const slice = createSlice({
    name: 'packs',
    initialState: initState,
    reducers: {

    }
})
export const packsReducer1 = slice.reducer