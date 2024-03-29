import { createAsyncThunk, createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { PacksDataType, SortType } from './type';

import { packsAPI } from 'api';
import {
  CreateNewPackRequestDataType,
  GetPacksRequestParamsType,
  UpdatePackRequestDataType,
} from 'api/packs-api';
import { StatusType, Nullable } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';
import { AppRootStateType } from 'store/type';

const initialState = {
  data: {
    page: 1,
    pageCount: 5,
  } as PacksDataType,

  params: {
    user_id: null as Nullable<string>,
    searchPacksName: null as Nullable<string>,
    sortPacks: null as Nullable<SortType>,
    min: null as Nullable<number>,
    max: null as Nullable<number>,
  },
  isSettings: false,
  isInitialized: false,
  notice: '',
  status: 'idle' as StatusType,
};
const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setNotice: (state, action: PayloadAction<string>) => {
      state.notice = action.payload;
    },
    setUserPacksId: (state, action: PayloadAction<Nullable<string>>) => {
      state.params.user_id = action.payload;
      state.params.min = null;
      state.params.max = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.data.page = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.data.pageCount = action.payload;
    },
    setSearchPacksName: (state, action: PayloadAction<Nullable<string>>) => {
      state.params.searchPacksName = action.payload;
    },
    setSortPacks: (state, action: PayloadAction<SortType>) => {
      state.params.sortPacks = action.payload;
    },
    setFilterValues: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.params.min = action.payload.min;
      state.params.max = action.payload.max;
      state.data.page = 1;
    },
    resetParams: state => {
      state.params.searchPacksName = null;
      state.params.min = null;
      state.params.max = null;
      state.data.maxCardsCount = 0;
      state.data.minCardsCount = 0;
      state.params.sortPacks = null;
    },
    initSettings: (state, action: PayloadAction<{ [key: string]: Nullable<string> }>) => {
      state.isSettings = true;
      state.params = { ...state.params, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPacks.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isInitialized = true;
        state.status = 'succeeded';
      })
      .addCase(createNewPack.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(deletePack.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(updatePack.fulfilled, state => {
        state.status = 'succeeded';
      });

    builder.addMatcher(
      isAnyOf(
        getPacks.pending,
        createNewPack.pending,
        deletePack.pending,
        updatePack.pending,
      ),
      (state: PacksStateType) => {
        state.status = 'pending';
      },
    );
    builder.addMatcher(
      isAnyOf(
        getPacks.rejected,
        createNewPack.rejected,
        deletePack.rejected,
        updatePack.rejected,
      ),
      (state: PacksStateType, action: PayloadAction<string | undefined>): void => {
        state.status = 'failed';

        if (action.payload) {
          state.notice = action.payload;
        } else {
          state.notice = 'unknown error, please try again later';
        }
      },
    );
  },
});

export const getPacks = createAsyncThunk<
  PacksDataType,
  Partial<GetPacksRequestParamsType>,
  { rejectValue: string }
>('packs/get-packs', async (reqData, { getState, rejectWithValue }) => {
  const { data, params } = (getState() as AppRootStateType).packs;

  const requestParams = {
    page: data.page,
    pageCount: data.pageCount,
    packName: params.searchPacksName,
    sortPacks: params.sortPacks,
    user_id: params.user_id,
    min: params.min,
    max: params.max,
    ...reqData,
  };

  try {
    const res = await packsAPI.getPacks(requestParams);

    return res.data;
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const createNewPack = createAsyncThunk<
  unknown,
  CreateNewPackRequestDataType,
  { rejectValue: string }
>('packs/add-new-pack', async (data, { dispatch, rejectWithValue }) => {
  try {
    await packsAPI.createNewPack(data);
    dispatch(getPacks({}));
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const deletePack = createAsyncThunk<unknown, string, { rejectValue: string }>(
  'packs/delete-pack',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await packsAPI.deletePack(id);
      dispatch(getPacks({}));
    } catch (err) {
      const error = getResponseErrorMessage(err);

      return rejectWithValue(error);
    }
  },
);
export const updatePack = createAsyncThunk<
  unknown,
  UpdatePackRequestDataType,
  { rejectValue: string }
>('packs/edit-pack-name', async (data, { dispatch, rejectWithValue }) => {
  try {
    await packsAPI.updatePack(data);
    dispatch(getPacks({}));
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});
export const packsReducer = slice.reducer;
export const packsActions = slice.actions;

export type PacksStateType = typeof initialState;
