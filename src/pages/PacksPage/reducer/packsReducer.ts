import { AxiosError } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppRootStateType } from './../../../store/store';
import { packsAPI, PacksType, RequestModelType, PacksResponseDataType } from './../../../api/packs-api';
import { _instance } from './../../../api/instance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StatusType } from '../../../App/types/types';
import { setAppMessage, setAppStatus } from '../../../App/reducers/appReducer';
const MIN_FILTER_VALUE = 0;
const MAX_FILTER_VALUE = 110;
const initState = {
   isInitialized: false,
   isAuthUserPacks: false,
   data: {
      cardPacks: [] as PacksType[],
      page: 1,
      pageCount: 5,
      cardPacksTotalCount: 5,
      filterValues: {
         min: MIN_FILTER_VALUE,
         max: MAX_FILTER_VALUE,
      },
      searchPackNameValue: null
   } as DataType,

   requestParams: {
      searchPackName: null as string | null
   },
   packsStatus: 'idle' as StatusType,
}
const slice = createSlice({
   name: 'packs',
   initialState: initState,
   reducers: {
      setIsAuthUserPacks(state, action: PayloadAction<{ isAuthUserPacks: boolean }>) {
         state.isAuthUserPacks = action.payload.isAuthUserPacks
         state.data.filterValues.min = MIN_FILTER_VALUE
         state.data.filterValues.max = MAX_FILTER_VALUE
      },
      setFilterValues(state, action: PayloadAction<{ min: number, max: number }>) {
         state.data.filterValues = action.payload
         state.data.page = 1
      },
      setPage(state, action: PayloadAction<{ page: number }>) {
         state.data.page = action.payload.page
      },
      setSearchPackNameValue(state, action: PayloadAction<{ searchPackNameValue: string }>) {
         state.data.searchPackNameValue = action.payload.searchPackNameValue
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getPacks.pending, (state) => {
         state.packsStatus = 'loading'
      })
      builder.addCase(getPacks.fulfilled, (state, action) => {
         state.packsStatus = 'success'
         state.isInitialized = true
         state.data = { ...state.data, ...action.payload }
      })
      builder.addCase(getPacks.rejected, (state, action) => {
         state.packsStatus = 'failed'
         state.isAuthUserPacks = false
      })
   }
})
export const { setIsAuthUserPacks, setFilterValues, setPage, setSearchPackNameValue } = slice.actions

export const getPacks = createAsyncThunk<PacksResponseDataType, RequestModelType, { rejectValue: { error: string }, }>(
   'packs/getPacks',
   async (requestModel: RequestModelType, { getState, dispatch, rejectWithValue }) => {
      const { packs } = getState() as AppRootStateType
      const user_id = (getState() as AppRootStateType).auth.authData._id
      const requestParams = {
         page: packs.data.page,
         pageCount: packs.data.pageCount,
         user_id: packs.isAuthUserPacks ? user_id : null,
         min: packs.data.filterValues.min,
         max: packs.data.filterValues.max,
         packName: packs.data.searchPackNameValue ? packs.data.searchPackNameValue : null,
         ...requestModel
      }
      try {
         const res = await packsAPI.getPacks(requestParams)
         return res.data
      } catch (err: any) {
         const error: string = (err as AxiosError).response ? err.response.data.error :
            'An error has occurred. Please try again later'
         dispatch(setAppStatus({ appStatus: 'failed' }))
         dispatch(setAppMessage({ appMessage: error }))
         return rejectWithValue({ error: error })
      }
   }
)


export const packsReducer = slice.reducer
type DataType = PacksResponseDataType & {
   filterValues: {
      min: number,
      max: number,
   },
   searchPackNameValue: null | string
}