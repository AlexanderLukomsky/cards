import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setAuthData } from '../auth-reducer';

import { authAPI } from 'api';
import { StatusType } from 'common/types';

const initialState = {
  isInitialized: false,
  status: 'idle' as StatusType,
};
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initializeApp.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(initializeApp.fulfilled, state => {
      state.status = 'succeeded';
      state.isInitialized = true;
    });

    builder.addCase(initializeApp.rejected, state => {
      state.status = 'idle';
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;

export const initializeApp = createAsyncThunk<
  unknown,
  undefined,
  { rejectValue: string }
>('app/initializeApp', async (_, { rejectWithValue, dispatch }) => {
  try {
    const res = await authAPI.me();

    dispatch(setAuthData({ data: res.data }));

    return res.data;
  } catch (err: any) {
    return rejectWithValue('Unauthorized');
  }
});
