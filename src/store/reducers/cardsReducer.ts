import { cardsAPI } from './../../api/cards-api';
import { AppThunk } from './../store';
import { CardsResponeDataType } from "../../api/cards-api"

export const cardsReducer = (state: InitStateType = initState, action: CardsActionType): InitStateType => {
    switch (action.type) {
        case 'cards/SET-CARDS': return { ...state, data: action.payload.data }
        case 'cards/SET-INITIALIZED': return { ...state, isInitialized: action.payload.isInitialized }
        default: return state
    }
}
const setCardsAC = (data: CardsResponeDataType) => (
    {
        type: 'cards/SET-CARDS',
        payload: { data }
    } as const
)
export const setInitializedAC = (isInitialized: boolean) => (
    {
        type: 'cards/SET-INITIALIZED',
        payload: { isInitialized }
    } as const
)
export const getCardsTC = (id: string): AppThunk => async (dispatch) => {
    try {
        const res = await cardsAPI.getCards(id)
        dispatch(setCardsAC(res.data))
        dispatch(setInitializedAC(true))
    } catch (e) {
        console.log('some error');
    }
}
const initState = {
    isInitialized: false,
    data: {} as CardsResponeDataType
}
type InitStateType = typeof initState
type CardsActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setInitializedAC>