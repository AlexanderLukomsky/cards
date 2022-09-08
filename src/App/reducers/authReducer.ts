import { AppDispatchType } from './../../store/store';
import { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { authAPI, EditProfileDataType, ForgotPasswordDataType, LoginResponseType, NewPasswordDataType, RegisterDataType, UpdateUserType } from './../../api/auth-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthDataType } from '../../api/auth-api';
import { StatusType } from '../../commonTypes/types';
import { initializedApp, setAppMessage, setAppStatus } from './appReducer';
import { setProfileUserId } from '../../pages/ProfilePage/reducer/profileReducer';
export const authInitState = {
   authData: {} as LoginResponseType,
   isAuth: false,
   authStatus: 'idle' as StatusType,
}
const slice = createSlice({
   name: 'auth',
   initialState: authInitState,
   reducers: {
      setAuthStatus(state, action: PayloadAction<{ authStatus: StatusType }>) {
         state.authStatus = action.payload.authStatus
      }
   },
   extraReducers: (builder) => {
      builder.addCase(setLogin.fulfilled, (state, action) => {
         state.authStatus = 'success'
         state.isAuth = true
         state.authData = action.payload
      })
      builder.addCase(logout.fulfilled, (state) => {
         state.authStatus = 'success'
         state.isAuth = false
         state.authData = {} as LoginResponseType
      })
      builder.addCase(registration.fulfilled, (state) => {
         state.authStatus = 'success'
      })
      builder.addCase(editedProfile.fulfilled, (state, action) => {
         state.authStatus = 'success'
         state.authData = action.payload.updatedUser
      })
      builder.addCase(initializedApp.fulfilled, (state, action) => {
         state.isAuth = true
         state.authData = action.payload
      })
      builder.addCase(forgotPassword.fulfilled, (state) => {
         state.authStatus = 'success'
      })
      builder.addCase(setNewPassword.fulfilled, (state) => {
         state.authStatus = 'success'
      })
   }
})
export const { setAuthStatus } = slice.actions
export const editedProfile = createAsyncThunk<UpdateUserType, EditProfileDataType,
   { rejectValue: { error: string }, dispatch: AppDispatchType }
>(
   'auth/edit-profile',
   async (data: EditProfileDataType, { dispatch, rejectWithValue }) => authThunkHandler(authAPI.updateUser(data), dispatch, rejectWithValue)
)

export const logout = createAsyncThunk<{}, undefined, { rejectValue: { error: string }, dispatch: AppDispatchType }
>(
   'auth/logout',
   (_, { dispatch, rejectWithValue }) => authThunkHandler(authAPI.logout(), dispatch, rejectWithValue)
)
export const registration = createAsyncThunk<{}, RegisterDataType, { rejectValue: { error: string }, dispatch: AppDispatchType }
>(
   'auth/registration',
   (data: RegisterDataType, { dispatch, rejectWithValue }) => authThunkHandler(authAPI.registration(data), dispatch, rejectWithValue)
)
export const setLogin = createAsyncThunk<LoginResponseType, AuthDataType, { rejectValue: { error: string } }
>(
   'auth/login',
   async (data: AuthDataType, { dispatch, rejectWithValue }) => {
      try {
         dispatch(setAppStatus({ appStatus: 'loading' }))
         dispatch(setAuthStatus({ authStatus: 'loading' }))
         const res = await authAPI.auth(data);
         dispatch(setProfileUserId({ user_id: res.data._id }))
         dispatch(setAppStatus({ appStatus: 'success' }))
         return res.data;
      } catch (err: any) {
         const error: string = (err as AxiosError).response ? err.response.data.error :
            'An error has occurred. Please try again later'
         dispatch(setAuthStatus({ authStatus: 'failed' }))
         dispatch(setAppStatus({ appStatus: 'failed' }))
         dispatch(setAppMessage({ appMessage: error }))
         return rejectWithValue({ error: error });
      }
   })
export const forgotPassword = createAsyncThunk<{}, ForgotPasswordDataType, { dispatch: AppDispatchType, rejectValue: { error: string } }>(
   'auth/password-recovery',
   (data: ForgotPasswordDataType, { dispatch, rejectWithValue }) => authThunkHandler(authAPI.forgotPassword(data), dispatch, rejectWithValue)
)
export const setNewPassword = createAsyncThunk<{}, NewPasswordDataType, { dispatch: AppDispatchType, rejectValue: { error: string } }>(
   'auth/set-new-password',
   (data: NewPasswordDataType, { dispatch, rejectWithValue }) => authThunkHandler(authAPI.newPassword(data), dispatch, rejectWithValue)
)
const authThunkHandler =
   async (asyncFn: Promise<AxiosResponse<LoginResponseType | UpdateUserType>>,
      dispatch: AppDispatchType,
      rejectWithValue: Function
   ) => {
      try {
         dispatch(setAppStatus({ appStatus: 'loading' }))
         dispatch(setAuthStatus({ authStatus: 'loading' }))
         const res = await asyncFn;
         dispatch(setAppStatus({ appStatus: 'success' }))
         return res.data;
      } catch (err: any) {
         const error: string = (err as AxiosError).response ? err.response.data.error :
            'An error has occurred. Please try again later'
         dispatch(setAuthStatus({ authStatus: 'failed' }))
         dispatch(setAppStatus({ appStatus: 'failed' }))
         dispatch(setAppMessage({ appMessage: error }))
         return rejectWithValue({ error: error });
      }
   }
export const authReducer = slice.reducer
//frist: return respons,  second thunk args, third rejectValue