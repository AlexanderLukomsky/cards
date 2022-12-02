/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthDataType, LoginRequestType } from './type';

import { authAPI, NewPasswordDataType, RegistrationDataType } from 'api';
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
    setStatus(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status;
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
      .addCase(setLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuth = true;
        state.data = action.payload;
      })
      .addCase(setLogin.rejected, (state, action) => {
        state.status = 'failed';
        action.payload
          ? (state.notice = action.payload)
          : (state.notice = 'unexpected error');
      })

      .addCase(registration.pending, state => {
        state.status = 'pending';
      })
      .addCase(registration.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(registration.rejected, (state, action) => {
        state.notice = action.payload
          ? action.payload.error
          : 'unknown error, please try again later';
        state.status = 'failed';
      })

      .addCase(setNewPassword.pending, state => {
        state.status = 'pending';
      })
      .addCase(setNewPassword.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.notice = action.payload
          ? action.payload.error
          : 'unknown error, please try again later';
      })

      .addCase(restorePassword.pending, state => {
        state.status = 'pending';
      })
      .addCase(restorePassword.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(restorePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.notice = action.payload
          ? action.payload.error
          : 'unknown error, please try again later';
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
>('login/setLogin', async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(data);

    return res.data;
  } catch (err: any) {
    const error: string = (err as AxiosError).response?.data
      ? err.response.data.error
      : '';

    return rejectWithValue(error);
  }
});

export const registration = createAsyncThunk<
  unknown,
  RegistrationDataType,
  { rejectValue: { error: string } }
>('registration/send', async (data, { rejectWithValue }) => {
  try {
    await authAPI.registration({ email: data.email, password: data.password });
  } catch (err: any) {
    const error = err.response ? err.response.data.error : 'Unexpected error';

    return rejectWithValue({ error });
  }
});

export const setNewPassword = createAsyncThunk<
  unknown,
  NewPasswordDataType,
  { rejectValue: { error: string } }
>('newPassword/set', async (data, { rejectWithValue }) => {
  try {
    await authAPI.newPassword({
      password: data.password,
      resetPasswordToken: data.resetPasswordToken,
    });
  } catch (err: any) {
    const error = err.response ? err.response.data.error : 'Unexpected error';

    return rejectWithValue({ error });
  }
});

export const restorePassword = createAsyncThunk<
  unknown,
  string,
  { rejectValue: { error: string } }
>('restorePassword/send', async (email, { rejectWithValue }) => {
  try {
    const data = {
      email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href=''>
                link</a>
                </div>`,
    };

    await authAPI.restorePassword(data);
  } catch (err: any) {
    const error = err.response ? err.response.data.error : 'Unexpected error';

    return rejectWithValue({ error });
  }
});
