import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { packsAPI, PacksResponseDataType, PacksType } from "../../../api/packs-api"
import { StatusType } from "../../../App/types/types"
import { AppRootStateType } from "../../../store/store"
const initialState = {
   user_id: '',
   packsData: {
      cardPacks: [] as PacksType[],
      page: 1,
      pageCount: 5,
      cardPacksTotalCount: 5
   } as PacksResponseDataType,
   isInitialized: false,
   profileStatus: 'idle' as StatusType
}
const slice = createSlice({
   name: 'profile',
   initialState: initialState,
   reducers: {
      setProfileUserId(state, action: PayloadAction<{ user_id: string }>) {
         state.user_id = action.payload.user_id
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getProfilePacks.fulfilled, (state, action) => {
         state.packsData = action.payload
         state.isInitialized = true
      })
   }
})
export const { setProfileUserId } = slice.actions
export const profileReducer = slice.reducer
export const getProfilePacks = createAsyncThunk<PacksResponseDataType, undefined, any>(
   'profile/getProfilePacks',
   async (_, { getState, rejectWithValue }) => {
      const { profile } = getState() as AppRootStateType
      const requestParams = {
         user_id: profile.user_id,
         page: profile.packsData.page,
         pageCount: profile.packsData.pageCount
      }
      try {
         const res = await packsAPI.getPacks(requestParams)
         return res.data
      } catch (e) {
         return rejectWithValue('some error')
      }
   }
)