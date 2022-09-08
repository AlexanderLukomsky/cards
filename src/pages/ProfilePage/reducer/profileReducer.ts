import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { packsAPI, PacksResponseDataType, PacksType } from "../../../api/packs-api"
import { PageCountType, StatusType } from "../../../commonTypes/types"
import { AppRootStateType } from "../../../store/store"
import { MAX_FILTER_VALUE, MIN_FILTER_VALUE } from "../../PacksPage/reducer/packsReducer"
const initialState = {
   user_id: '',
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
   isInitialized: false,
   profileStatus: 'idle' as StatusType
}
const slice = createSlice({
   name: 'profile',
   initialState: initialState,
   reducers: {
      setProfileUserId(state, action: PayloadAction<{ user_id: string }>) {
         state.user_id = action.payload.user_id
      },
      setProfilePage(state, action: PayloadAction<{ page: number }>) {
         state.data.page = action.payload.page
      },
      setProfilePageCount(state, action: PayloadAction<{ pageCount: PageCountType }>) {
         state.data.pageCount = action.payload.pageCount
      },
      setProfileSeacrhPackName(state, action: PayloadAction<{ searchPackNameValue: string }>) {
         state.data.searchPackNameValue = action.payload.searchPackNameValue
      },
      setProfileFilterValues(state, action: PayloadAction<{ min: number, max: number }>) {
         state.data.filterValues = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getProfilePacks.pending, (state, action) => {
         state.isInitialized = false
         state.profileStatus = 'loading'
      })
      builder.addCase(getProfilePacks.fulfilled, (state, action) => {
         state.data = { ...state.data, ...action.payload }
         state.isInitialized = true
         state.profileStatus = 'success'
      })
      builder.addCase(getProfilePacks.rejected, (state, action) => {
         state.profileStatus = 'failed'
      })
   }
})
export const { setProfileUserId, setProfilePage, setProfilePageCount, setProfileSeacrhPackName, setProfileFilterValues } = slice.actions
export const profileReducer = slice.reducer
export const getProfilePacks = createAsyncThunk<PacksResponseDataType, undefined, any>(
   'profile/getProfilePacks',
   async (_, { getState, rejectWithValue }) => {
      const { profile } = getState() as AppRootStateType
      const requestParams = {
         user_id: profile.user_id,
         page: profile.data.page,
         pageCount: profile.data.pageCount,
         packName: profile.data.searchPackNameValue ? profile.data.searchPackNameValue : null,
         min: profile.data.filterValues.min,
         max: profile.data.filterValues.max,
      }
      try {
         const res = await packsAPI.getPacks(requestParams)
         return res.data
      } catch (e) {
         return rejectWithValue('some error')
      }
   }
)
type DataType = PacksResponseDataType & {
   filterValues: {
      min: number,
      max: number,
   },
   searchPackNameValue: null | string
   packName: null | string,
}  