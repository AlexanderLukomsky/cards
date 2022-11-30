import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthDataType } from './type';

import { authAPI } from 'api';
import { StatusType } from 'common/types';

const slice = createSlice({
  name: 'auth',
  initialState: {
    data: {} as AuthDataType,
    isAuth: false,
    status: 'idle' as StatusType,
  },
  reducers: {
    setAuthData: (state, action: PayloadAction<{ data: AuthDataType }>) => {
      state.data = action.payload.data;
      state.isAuth = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(setLogout.pending, state => {
      state.status = 'pending';
    });
    builder.addCase(setLogout.fulfilled, state => {
      state.data = {} as AuthDataType;
      state.isAuth = false;
    });
    builder.addCase(setLogout.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const authReducer = slice.reducer;
export const { setAuthData } = slice.actions;
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
