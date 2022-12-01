import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAuthData } from '../auth-reducer';

import { authAPI, UpdateProfileType } from 'api';
import { StatusType } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';

const initialState = {
  status: 'idle' as StatusType,
  notice: '',
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setNotice(state, action: PayloadAction<{ notice: string }>) {
      state.notice = action.payload.notice;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateProfile.pending, state => {
        state.status = 'pending';
      })
      .addCase(updateProfile.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        if (action.payload) {
          state.notice = action.payload;
        }
        state.status = 'failed';
      });
  },
});

export const profileReducer = slice.reducer;

export const { setNotice } = slice.actions;

export const updateProfile = createAsyncThunk<
  unknown,
  UpdateProfileType,
  { rejectValue: string }
>('profile/setName', async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await authAPI.updateProfile(data);

    dispatch(setAuthData({ data: res.data.updatedUser }));
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});
