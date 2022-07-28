import { PacksDataType } from './../../api/packs-api';
import { packsAPI } from '../../api/packs-api';
import { AppThunk } from '../store';
export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return { ...state, ...action.payload }
        case 'packs/IS-INITIALIZED': return { ...state, isInitialized: action.payload.isInitialized }
        case 'packs/SET-STATUS': return { ...state, status: action.payload.status }

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
const setStatus = (status: StatusType) => (
    { type: 'packs/SET-STATUS', payload: { status } } as const
)
// TC
export const getPacksTC = (requestModel?: RequestModelType): AppThunk => async (dispatch, getState) => {
    dispatch(setIsInitializedPacksAC({ isInitialized: false }))
    const initState = getState().packs
    const requestParams = {
        page: initState.data.page,
        pageCount: initState.data.pageCount,
        min: initState.params.min,
        max: initState.params.max,
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
        dispatch(setStatus('loading'))
        await packsAPI.createPack(packName)
        dispatch(getPacksTC())
        dispatch(setStatus('success'))
    } catch (error) {

    } finally {
        dispatch(setStatus('initial'))
    }
}
export const deletePackTC = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        await packsAPI.deletePack(id)
        dispatch(getPacksTC())
        dispatch(setStatus('success'))
    } catch (error) {

    } finally {
        dispatch(setStatus('initial'))
    }
}
export const editPackNameTC = ({ id, packName }: { id: string, packName: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        await packsAPI.editPackName({ _id: id, name: packName })
        dispatch(getPacksTC())
        dispatch(setStatus('success'))
    } catch (error) {

    } finally {
        dispatch(setStatus('initial'))
    }
}
export type PacksActionType =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setIsInitializedPacksAC>
    | ReturnType<typeof setStatus>

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
    status: 'idle' as StatusType
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