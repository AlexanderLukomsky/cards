import { createSlice, createAsyncThunk, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthDataType } from './type';

import { authAPI } from 'api';
import {
  LoginRequestDataType,
  NewPasswordRequestDataType,
  RegistrationRequestDataType,
} from 'api/auth-api';
import { StatusType } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';

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
    const setPendingStatus = (state: AuthStateType): void => {
      state.status = 'pending';
    };

    const handleReject = (
      state: AuthStateType,
      action: PayloadAction<string | undefined>,
    ): void => {
      state.status = 'failed';

      if (action.payload) {
        state.notice = action.payload;
      } else {
        state.notice = 'unknown error, please try again later';
      }
    };

    builder
      .addCase(setLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuth = true;
        state.data = action.payload;
      })

      .addCase(setLogout.fulfilled, state => {
        state.data = {} as AuthDataType;
        state.isAuth = false;
        state.status = 'succeeded';
      })

      .addCase(registration.fulfilled, state => {
        state.status = 'succeeded';
      })

      .addCase(setNewPassword.fulfilled, state => {
        state.status = 'succeeded';
      })

      .addCase(restorePassword.fulfilled, state => {
        state.status = 'succeeded';
      });
    builder.addMatcher(
      isAnyOf(
        setLogout.pending,
        setLogin.pending,
        registration.pending,
        restorePassword.pending,
        setNewPassword.pending,
      ),
      setPendingStatus,
    );
    builder.addMatcher(
      isAnyOf(
        setLogin.rejected,
        setLogout.rejected,
        restorePassword.rejected,
        setNewPassword.rejected,
        registration.rejected,
      ),
      handleReject,
    );
  },
});

export const authReducer = slice.reducer;
export const { setAuthData, setNotice } = slice.actions;

export const setLogout = createAsyncThunk<unknown, undefined, { rejectValue: string }>(
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
  LoginRequestDataType,
  { rejectValue: string }
>('login/setLogin', async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(data);

    return res.data;
  } catch (err: any) {
    const error: string = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const registration = createAsyncThunk<
  unknown,
  RegistrationRequestDataType,
  { rejectValue: string }
>('registration/send', async (data, { rejectWithValue }) => {
  try {
    await authAPI.registration({ email: data.email, password: data.password });
  } catch (err: any) {
    const error = err.response ? err.response.data.error : 'Unexpected error';

    return rejectWithValue(error);
  }
});

export const setNewPassword = createAsyncThunk<
  unknown,
  NewPasswordRequestDataType,
  { rejectValue: string }
>('newPassword/set', async (data, { rejectWithValue }) => {
  try {
    await authAPI.newPassword(data);
  } catch (err: any) {
    const error = err.response ? err.response.data.error : 'Unexpected error';

    return rejectWithValue(error);
  }
});

export const restorePassword = createAsyncThunk<unknown, string, { rejectValue: string }>(
  'restorePassword/send',
  async (email, { rejectWithValue }) => {
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

      return rejectWithValue(error);
    }
  },
);

type AuthStateType = ReturnType<typeof slice.getInitialState>;
