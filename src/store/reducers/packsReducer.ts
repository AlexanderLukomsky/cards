import { PacksDataType } from './../../api/packs-api';
import { packsAPI, PacksType } from '../../api/packs-api';
import { AppThunk } from '../store';
export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return { ...state, isInitialized: action.payload.isInitialized, data: action.payload.data }
        default: return state
    }
}
const setPacksAC = (payload: { isInitialized: boolean, data: PacksDataType }) => (
    {
        type: 'packs/SET-PACKS',
        payload
    } as const
)
export const getPacksTC = (requestModel?: RequestModelType): AppThunk => async (dispatch, getState) => {
    const state = getState().packs.data
    const requestParams = {
        pageCount: state.pageCount,
        page: state.page,
        ...requestModel
    }
    try {
        const res = await packsAPI.getPacks(requestParams)
        console.log(res);
        dispatch(setPacksAC({ isInitialized: true, data: res.data }))
    } catch (e) {
        console.log('error cards page');
    }
}
export type PacksActionType =
    | ReturnType<typeof setPacksAC>


const initState = {
    isInitialized: false,
    data: {
        cardPacksTotalCount: 5,
        pageCount: 5,
        page: 1
    } as PacksDataType
}
type InitStateType = typeof initState

type RequestModelType = {
    pageCount?: number,
    page?: number
}