import { packsAPI, PacksType } from '../../api/packs-api';
import { AppThunk } from '../store';
export const packsReducer = (state: InitStateType = initState, action: PacksActionType): InitStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS': return { ...state, isInitialized: action.payload.isInitialized, cardsPack: action.payload.data }
        default: return state
    }
}
const setPacksAC = (payload: { isInitialized: boolean, data: PacksType[] }) => (
    {
        type: 'packs/SET-PACKS',
        payload
    } as const
)
export const getPacksTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await packsAPI.getPacks()
        dispatch(setPacksAC({ isInitialized: true, data: res.data.cardPacks }))
    } catch (e) {
        console.log('error cards page');
    }
}
type PacksActionType = ReturnType<typeof setPacksAC>


const initState = {
    isInitialized: false,
    cardsPack: [{}] as PacksType[]
}
type InitStateType = typeof initState