import { Dispatch } from 'redux';
import { PageCountType } from './../../../types/types';
import { AxiosError } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppRootStateType } from './../../../store/store';
import { packsAPI, PacksType, RequestModelType, PacksResponseDataType } from './../../../api/packs-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StatusType } from '../../../types/types';
import { handleAppNetworkError } from '../../../utils/appHandler';
export const MIN_FILTER_VALUE = 0;
export const MAX_FILTER_VALUE = 110;
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
   updatePack: false
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
      },
      setPageCount(state, action: PayloadAction<{ pageCount: PageCountType }>) {
         state.data.pageCount = action.payload.pageCount
      },
      setPacksStatus(state, action: PayloadAction<{ packsStatus: StatusType }>) {
         state.packsStatus = action.payload.packsStatus
      },
      setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
         state.isInitialized = action.payload.isInitialized
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getPacks.fulfilled, (state, action) => {
         state.data = { ...state.data, ...action.payload }
      })
      builder.addCase(addNewPack.fulfilled, (state) => {
         state.updatePack = !state.updatePack
      })
      builder.addCase(deletePack.fulfilled, (state) => {
         state.updatePack = !state.updatePack
      })
      builder.addCase(editPackName.fulfilled, (state) => {
         state.updatePack = !state.updatePack
      })
   }
})
export const {
   setIsAuthUserPacks,
   setFilterValues,
   setPage,
   setSearchPackNameValue,
   setPageCount,
   setPacksStatus,
   setIsInitialized,
} = slice.actions

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
      dispatch(setPacksStatus({ packsStatus: 'loading' }))
      try {
         const res = await packsAPI.getPacks(requestParams)
         dispatch(setPacksStatus({ packsStatus: 'success' }))
         dispatch(setIsInitialized({ isInitialized: true }))
         return res.data
      } catch (err: any) {
         const error: AxiosError<any> = err
         handleAppNetworkError(error, dispatch)
         dispatch(setPacksStatus({ packsStatus: 'failed' }))
         dispatch(setIsInitialized({ isInitialized: false }))
         return rejectWithValue({ error: error.message })
      }
   }
)
export const addNewPack = createAsyncThunk(
   'packs/add-new-pack',
   async (name: string, { dispatch, rejectWithValue }) => {
      dispatch(setPacksStatus({ packsStatus: 'loading' }))
      try {
         const res = await packsAPI.addNewPack(name)
         dispatch(setPacksStatus({ packsStatus: 'success' }))
         return res.data
      } catch (err: any) {
         const error: AxiosError = err
         handleAppNetworkError(error, dispatch)
         dispatch(setPacksStatus({ packsStatus: 'failed' }))
         return rejectWithValue({ error: error.message })
      }
   }
)
export const deletePack = createAsyncThunk(
   'packs/delete-pack',
   async (id: string, { dispatch, rejectWithValue }) => {
      dispatch(setPacksStatus({ packsStatus: 'loading' }))
      try {
         const res = await packsAPI.deletePack(id)
         dispatch(setPacksStatus({ packsStatus: 'success' }))
         return res.data
      } catch (err: any) {
         const error: AxiosError = err
         handleAppNetworkError(error, dispatch)
         dispatch(setPacksStatus({ packsStatus: 'failed' }))
         return rejectWithValue({ error: error.message })
      }
   }
)
export const editPackName = createAsyncThunk(
   'packs/edit-pack-name',
   async (cardsPack: { _id: string, name: string }, { dispatch, rejectWithValue }) => {
      dispatch(setPacksStatus({ packsStatus: 'loading' }))
      try {
         const res = await packsAPI.editPackName(cardsPack)
         dispatch(setPacksStatus({ packsStatus: 'success' }))
         return res.data
      } catch (err: any) {
         const error: AxiosError = err
         handleAppNetworkError(error, dispatch)
         dispatch(setPacksStatus({ packsStatus: 'failed' }))
         return rejectWithValue({ error: error.message })
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