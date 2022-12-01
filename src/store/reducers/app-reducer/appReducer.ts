import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    const setPendingStatus = (state: AppStateType, action: PayloadAction<any>): void => {
      state.status = action.payload;
    };

    builder
      .addCase(
        initializeApp.pending,
        (state: AppStateType, action: PayloadAction<any>): void => {
          console.log(action);
          setPendingStatus(state, action);
        },
      )

      .addCase(initializeApp.fulfilled, state => {
        state.status = 'succeeded';
        state.isInitialized = true;
      })
      .addCase(initializeApp.rejected, state => {
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

type AppStateType = typeof initialState;
