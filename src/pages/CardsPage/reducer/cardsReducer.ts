import { AppRootStateType } from './../../../store/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusType } from '../../../commonTypes/types';
import { cardsAPI, CardsResponeDataType, AddCardModelType } from './../../../api/cards-api';
import { createSlice } from '@reduxjs/toolkit';
import { handleAppNetworkError } from '../../../utils/appHandler';
import { AxiosError } from 'axios';
const initState = {
   data: { page: 1, pageCount: 5 } as CardsResponeDataType,
   isInitialized: false,
   cardsStatus: 'idle' as StatusType,
   updateCards: false,
   searchCardsName: null as null | string,
   searchBy: 'question'
}
const slice = createSlice({
   name: 'cards',
   initialState: initState,
   reducers: {
      setCardsStatus(state, action: PayloadAction<{ cardsStatus: StatusType }>) {
         state.cardsStatus = action.payload.cardsStatus
      },
      setCardsPage(state, action: PayloadAction<{ page: number }>) {
         state.data.page = action.payload.page
      },
      setSearchCardsName(state, action: PayloadAction<{ searchCardsName: null | string }>) {
         state.searchCardsName = action.payload.searchCardsName
      },
      setPageCount(state, action: PayloadAction<{ pageCount: number }>) {
         state.data.pageCount = action.payload.pageCount
      },
      setSearchBy(state, action: PayloadAction<{ searchBy: string }>) {
         state.searchBy = action.payload.searchBy
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getCards.fulfilled, (state, action) => {
         state.data = action.payload
         state.isInitialized = true
      })
      builder.addCase(addNewCard.fulfilled, (state) => {
         state.updateCards = !state.updateCards
      })
      builder.addCase(searchCards.fulfilled, (state, action) => {
         state.data = action.payload
      })
   }
})
export const cardsReducer = slice.reducer
export const { setCardsStatus, setCardsPage, setSearchCardsName, setPageCount, setSearchBy } = slice.actions
export const getCards = createAsyncThunk(
   'cards/get-cards',
   async (id: string, { rejectWithValue, dispatch, getState }) => {
      const { cards } = getState() as AppRootStateType
      dispatch(setCardsStatus({ cardsStatus: 'loading' }))
      const requestParams = {
         cardsPack_id: id,
         page: cards.data.page,
         pageCount: cards.data.pageCount,
      }
      try {
         const res = await cardsAPI.getCards(requestParams)
         dispatch(setCardsStatus({ cardsStatus: 'success' }))
         return res.data
      } catch (err: any) {
         const error: AxiosError = err
         handleAppNetworkError(error, dispatch)
         dispatch(setCardsStatus({ cardsStatus: 'failed' }))
         return rejectWithValue({ error: error.message })
      }
   }
)
export const addNewCard = createAsyncThunk(
   'cards/add-new-card',
   async (model: AddCardModelType, { dispatch, rejectWithValue }) => {
      dispatch(setCardsStatus({ cardsStatus: 'loading' }))
      try {
         const res = await cardsAPI.addCard(model)
         dispatch(setCardsStatus({ cardsStatus: 'success' }))
         return res.data
      } catch (err: any) {
         const error: AxiosError = err
         handleAppNetworkError(error, dispatch)
         dispatch(setCardsStatus({ cardsStatus: 'failed' }))
         return rejectWithValue({ error: error.message })
      }
   }
)
export const searchCards = createAsyncThunk(
   'cards/search-cards',
   async (cardsPack_id: string, { dispatch, rejectWithValue, getState }) => {
      const { cards } = (getState() as AppRootStateType)
      const requestParams = {
         cardsPack_id,
         page: 1,
         pageCount: cards.data.pageCount,
         cardQuestion: null as null | string,
         cardAnswer: null as null | string
      }
      cards.searchBy === 'question' ? requestParams.cardQuestion = cards.searchCardsName : requestParams.cardAnswer = cards.searchCardsName
      dispatch(setCardsStatus({ cardsStatus: 'loading' }))
      try {
         const questionRes = await cardsAPI.getCards(requestParams)
         await new Promise((res) => { (setTimeout(() => res(''), 500)) })
         dispatch(setCardsStatus({ cardsStatus: 'success' }))
         return questionRes.data
      } catch (err: any) {
         const error: AxiosError = err
         handleAppNetworkError(error, dispatch)
         dispatch(setSearchCardsName({ searchCardsName: null }))
         dispatch(setCardsStatus({ cardsStatus: 'failed' }))
         return rejectWithValue({ error: error.message })
      }
   }
)