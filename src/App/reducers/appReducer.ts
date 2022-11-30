import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatusType } from '../../commonTypes/types';
import { setProfileUserId } from '../../pages/ProfilePage/reducer/profileReducer';

import { registration } from './authReducer';

import { authAPI } from 'api';

const initialState = {
  appStatus: 'idle' as StatusType,
  appMessage: '',
  isInitializedApp: false,
};
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ appStatus: StatusType }>) {
      state.appStatus = action.payload.appStatus;
    },
    setAppMessage(state, action: PayloadAction<{ appMessage: string }>) {
      state.appMessage = action.payload.appMessage;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializedApp.pending, state => {
      state.isInitializedApp = false;
      state.appStatus = 'loading';
    });
    builder.addCase(initializedApp.fulfilled, state => {
      state.isInitializedApp = true;
      state.appStatus = 'success';
    });
    builder.addCase(initializedApp.rejected, state => {
      state.isInitializedApp = true;
      state.appStatus = 'idle';
    });
    builder.addCase(registration.fulfilled, state => {
      state.appStatus = 'success';
      state.appMessage = 'Registration completed successfully';
    });
  },
});

export const { setAppMessage, setAppStatus } = slice.actions;

export const initializedApp = createAsyncThunk(
  'app/initializedApp',
  async (_, { dispatch }) => {
    const res = await authAPI.me();

    dispatch(setProfileUserId({ user_id: res.data._id }));

    return res.data;
  },
);
export const appReducer = slice.reducer;
