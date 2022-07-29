import { PacksDataType } from './../../api/packs-api';
import { packsAPI } from '../../api/packs-api';
import { AppThunk } from '../store';
export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return { ...state, ...action.payload }
        case 'packs/IS-INITIALIZED':
            return { ...state, isInitialized: action.payload.isInitialized }
        case 'packs/CHANGE-PAGE':
            return { ...state, data: { ...state.data, page: action.payload.page } }
        case 'packs/SET-STATUS': return { ...state, status: action.payload.status }
        case 'packs/GET-USER-PACK':
            return { ...state, userPacksId: action.payload.userPacksId, params: { min: 0, max: 110 } }
        case 'packs/SET-PAGE-COUNT':
            return { ...state, data: { ...state.data, pageCount: action.payload.pageCount, page: 1 } }
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
const setStatusAC = (status: StatusType) => (
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

export const getUserPack = (userPacksId: string | null) => (
    {
        type: 'packs/GET-USER-PACK',
        payload: { userPacksId }
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
        user_id: state.packs.userPacksId,
        ...requestModel
    }
    const params = requestModel?.max ?
        { min: requestModel.min!, max: requestModel.max } :
        { min: initState.params.min, max: initState.params.max }


    try {
        const res = await packsAPI.getPacks(requestParams)
        dispatch(setPacksAC({ data: res.data, params }))
    } catch (e) {

    } finally {
        dispatch(setIsInitializedPacksAC({ isInitialized: true }))
    }
}
export const createPackTC = (packName: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatusAC('loading'))
        const res = await packsAPI.createPack(packName)
        dispatch(getPacksTC())
        dispatch(setStatusAC('success'))
        return res
    } catch (error) {

    } finally {
        dispatch(setStatusAC('initial'))
    }
}
export const deletePackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatusAC('loading'))
        await packsAPI.deletePack(id)
        dispatch(getPacksTC())
        dispatch(setStatusAC('success'))
    } catch (error) {

    } finally {
        dispatch(setStatusAC('initial'))
    }
}
export const editPackNameTC = ({ id, packName }: { id: string, packName: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatusAC('loading'))
        await packsAPI.editPackName({ _id: id, name: packName })
        dispatch(getPacksTC())
        dispatch(setStatusAC('success'))
    } catch (error) {

    } finally {
        dispatch(setStatusAC('initial'))
    }
}
export type PacksActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setIsInitializedPacksAC>
    | ReturnType<typeof changePacksPageAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof getUserPack>
    | ReturnType<typeof setPageCountAC>

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
    userPacksId: null as string | null
}
type InitStateType = typeof initState
type StatusType = 'failed' | 'success' | 'initial' | 'loading'
type RequestModelType = {
    pageCount?: number
    page?: number
    min?: number
    max?: number
    packName?: string
}