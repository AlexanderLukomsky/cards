import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthDataType, LoginRequestType } from './type';

import { authAPI } from 'api';
import { StatusType } from 'common/types';

const slice = createSlice({
  name: 'auth',
  initialState: {
    data: {} as AuthDataType,
    isAuth: false,
    status: 'idle' as StatusType,
    notice: '',
  },
  reducers: {
    setAuthData: (state, action: PayloadAction<{ data: AuthDataType }>) => {
      state.data = action.payload.data;
      state.isAuth = true;
    },
    setNotice: (state, action: PayloadAction<{ notice: string }>) => {
      state.notice = action.payload.notice;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setLogout.pending, state => {
        state.status = 'pending';
      })
      .addCase(setLogout.fulfilled, state => {
        state.data = {} as AuthDataType;
        state.isAuth = false;
      })
      .addCase(setLogout.rejected, state => {
        state.status = 'failed';
      })
      .addCase(setLogin.pending, state => {
        state.status = 'pending';
      })
      .addCase(setLogin.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(setLogin.rejected, (state, action) => {
        state.status = 'failed';
        action.payload
          ? (state.notice = action.payload)
          : (state.notice = 'unexpected error');
      });
  },
});

export const authReducer = slice.reducer;
export const { setAuthData, setNotice } = slice.actions;

export const setLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (err: any) {
      const error: string = (err as AxiosError).response?.data
        ? err.response.data.error
        : '';

      return rejectWithValue(error);
    }
  },
);

export const setLogin = createAsyncThunk<
  AuthDataType,
  LoginRequestType,
  { rejectValue: string }
>('login/setLogin', async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await authAPI.login(data);

    dispatch(setAuthData({ data: res.data }));

    return res.data;
  } catch (err: any) {
    const error: string = (err as AxiosError).response?.data
      ? err.response.data.error
      : '';

    return rejectWithValue(error);
  }
});
