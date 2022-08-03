import { AddCardModelType, cardsAPI, CardsType } from '../../../api/cards-api';
import { AppThunk } from '../../../store/store';
import { CardsResponeDataType } from "../../../api/cards-api"
import { StatusType } from '../../../_types/types';

export const cardsReducer = (state: InitStateType = initState, action: CardsActionType): InitStateType => {
    switch (action.type) {
        case 'cards/SET-CARDS': return { ...state, data: action.payload.data }
        case 'cards/SET-INITIALIZED': return { ...state, isInitialized: action.payload.isInitialized }
        case 'cards/ADD-CARD': return { ...state, data: { ...state.data, cards: [action.payload.card, ...state.data.cards] } }
        case 'cards/SET-STATUS': return { ...state, updateStatus: { status: action.payload.status } }
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
const addCardAC = (card: CardsType) => (
    {
        type: 'cards/ADD-CARD',
        payload: { card }
    } as const
)
const setCardsStatus = (status: StatusType) => (
    {
        type: 'cards/SET-STATUS',
        payload: { status }
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
export const addCardTC = (model: AddCardModelType): AppThunk => async (dispatch) => {
    try {
        dispatch(setCardsStatus('loading'))
        const res = await cardsAPI.addCard(model)
        dispatch(addCardAC(res.data.newCard))
    } finally {
        dispatch(setCardsStatus('initial'))
    }
}
const initState = {
    isInitialized: false,
    data: {} as CardsResponeDataType,
    updateStatus: { status: 'initial' as StatusType }
}
type InitStateType = typeof initState
type CardsActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setInitializedAC>
    | ReturnType<typeof addCardAC>
    | ReturnType<typeof setCardsStatus>