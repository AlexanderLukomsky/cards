import { PacksDataType, PacksType } from './../../api/packs-api';
import { packsAPI } from '../../api/packs-api';
import { AppThunk } from '../store';
export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return {
                ...state,
                isInitialized: action.payload.isInitialized,
                data: action.payload.data
            }
        case 'packs/CHANGE-MIN-MAX-CARDS-VALUE':
            return {
                ...state, params: {
                    ...state.params,
                    minCards: action.payload.values.min,
                    maxCards: action.payload.values.max
                }
            }
        default: return state
    }
}
const setPacksAC = (payload: { isInitialized: boolean, data: PacksDataType }) => (
    {
        type: 'packs/SET-PACKS',
        payload
    } as const
)
export const changeMinMaxCardsValueAC = (values: { min: number, max: number }) => ({
    type: 'packs/CHANGE-MIN-MAX-CARDS-VALUE',
    payload: { values }
} as const)
export const getPacksTC = (requestModel?: RequestModelType): AppThunk => async (dispatch, getState) => {
    const state = getState().packs
    const requestParams = {
        page: state.data.page,
        pageCount: state.data.pageCount,
        min: state.params.minCards,
        max: state.params.maxCards,
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
    | ReturnType<typeof changeMinMaxCardsValueAC>


const initState = {
    isInitialized: false,
    data: {
        page: 1,
        pageCount: 5,
        cardPacksTotalCount: 5,
    } as PacksDataType,
    params: {
        minCards: 0,
        maxCards: 110
    }
}
type InitStateType = typeof initState

type RequestModelType = {
    pageCount?: number
    page?: number
    min?: number
    max?: number
}