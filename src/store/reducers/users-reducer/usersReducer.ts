import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { UsersDataType, UserType } from './types';

import { usersAPI } from 'api';
import { StatusType } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';
import { AppRootStateType } from 'store';

const slice = createSlice({
  name: 'users',
  initialState: {
    data: {
      users: [] as UserType[],
      page: 1,
      pageCount: 7,
    } as UsersDataType,
    isInitialized: false,
    status: 'idle' as StatusType,
    notice: '',
  },
  reducers: {
    setUsersNotice: (state, action: PayloadAction<string>) => {
      state.notice = action.payload;
    },
    setUserPage: (state, action: PayloadAction<number>) => {
      state.data.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.status = 'pending';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
        state.isInitialized = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.notice = action.payload;

          return;
        }
        state.notice = 'unknown error, please try again later';
      });
  },
});

export const usersReducer = slice.reducer;
export const { setUsersNotice, setUserPage } = slice.actions;

export const getUsers = createAsyncThunk<
  UsersDataType,
  undefined,
  { rejectValue: string }
>('users/get-users', async (_, { rejectWithValue, getState }) => {
  const { page, pageCount } = (getState() as AppRootStateType).users.data;

  try {
    const res = await usersAPI.getUsers({
      page,
      pageCount,
      sortUsers: '0publicCardPacksCount',
    });

    return res.data;
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});
