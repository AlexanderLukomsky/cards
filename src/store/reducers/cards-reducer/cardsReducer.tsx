import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { CardType } from './types';

import { cardsAPI, packsAPI } from 'api';
import {
  AddNewCardRequestType,
  CardGetType,
  EditCardRequestType,
  UpdatePackNameRequestType,
} from 'api/cards-api';
import { StatusType } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';
import { AppRootStateType } from 'store/type';

export type DataType = typeof data;
const data = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  packCreated: '',
  packDeckCover: '',
  packName: '',
  packPrivate: false,
  packUpdated: '',
  packUserId: '',
  page: 0,
  pageCount: 5,
  token: '',
  tokenDeathTime: 0,
};

const initialState = {
  data,
  status: 'idle' as StatusType,
  notice: '',
  page: 1,
  pageCount: 5,
};

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status;
    },
    setNotice(state, action: PayloadAction<{ notice: string }>) {
      state.notice = action.payload.notice;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    const setStatusPending = (state: CardsStateType): void => {
      state.status = 'pending';
    };
    const handleReject = (
      state: CardsStateType,
      action: PayloadAction<string | undefined>,
    ): void => {
      if (action.payload) {
        state.notice = action.payload;
      }
      state.status = 'failed';
    };

    builder
      .addCase(getCards.pending, setStatusPending)
      .addCase(addNewCard.pending, setStatusPending)
      .addCase(deleteCard.pending, setStatusPending)
      .addCase(editCard.pending, setStatusPending)
      .addCase(dataSort.pending, setStatusPending)
      .addCase(editPackNameFromCards.pending, setStatusPending)
      .addCase(deletePackFromCards.pending, setStatusPending)

      .addCase(getCards.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })

      .addCase(getCards.rejected, handleReject)
      .addCase(addNewCard.rejected, handleReject)
      .addCase(deleteCard.rejected, handleReject)
      .addCase(editCard.rejected, handleReject)
      .addCase(dataSort.rejected, handleReject);
  },
});

export const cardsReducer = slice.reducer;

export const { setStatus, setNotice, setPageCount, setPage } = slice.actions;

export const getCards = createAsyncThunk<DataType, CardGetType, { rejectValue: string }>(
  'cards/getCards',
  async (data, { getState, rejectWithValue }) => {
    try {
      const { cards } = getState() as AppRootStateType;
      const response = await cardsAPI.getCards({
        ...data,
        pageCount: cards.pageCount,
        page: cards.page,
      });

      return response.data;
    } catch (err) {
      const error = getResponseErrorMessage(err);

      return rejectWithValue(error);
    }
  },
);

export const addNewCard = createAsyncThunk<
  unknown,
  AddNewCardRequestType,
  { rejectValue: string }
>('cards/addCard', async (card, { dispatch, rejectWithValue }) => {
  try {
    await cardsAPI.addCard(card);
    dispatch(getCards({ cardsPack_id: card.cardsPack_id }));
    dispatch(setStatus({ status: 'succeeded' }));

    return true;
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const deleteCard = createAsyncThunk<
  unknown,
  DeleteDataType,
  { rejectValue: string }
>('cards/deleteCard', async (data, { dispatch, rejectWithValue }) => {
  try {
    await cardsAPI.deleteCard(data.cardId);
    dispatch(getCards({ cardsPack_id: data.packId }));
    dispatch(setStatus({ status: 'succeeded' }));

    return true;
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const editCard = createAsyncThunk<unknown, EditDataType, { rejectValue: string }>(
  'cards/editCard',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await cardsAPI.editCard(data.card);
      dispatch(getCards({ cardsPack_id: data.packId }));
      dispatch(setStatus({ status: 'succeeded' }));

      return true;
    } catch (err) {
      const error = getResponseErrorMessage(err);

      return rejectWithValue(error);
    }
  },
);

export const dataSort = createAsyncThunk<unknown, DataSortType, { rejectValue: string }>(
  'cards/dataSort',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(
        getCards({
          cardsPack_id: data.packId,
          direction: data.direction,
          value: data.value,
        }),
      );
      dispatch(setStatus({ status: 'succeeded' }));

      return true;
    } catch (err) {
      const error = getResponseErrorMessage(err);

      return rejectWithValue(error);
    }
  },
);

export const editPackNameFromCards = createAsyncThunk<
  unknown,
  UpdatePackNameRequestType,
  { rejectValue: string }
>('cards/editPackName', async (data, { dispatch, rejectWithValue }) => {
  try {
    await packsAPI.updatePackName(data);
  } catch (err: any) {
    const error: string = (err as AxiosError).response?.data
      ? err.response.data.error
      : '';

    dispatch(setNotice({ notice: error }));

    return rejectWithValue(error);
  }
});
export const deletePackFromCards = createAsyncThunk<
  unknown,
  string,
  { rejectValue: string }
>('cards/deletePack', async (id, { dispatch, rejectWithValue }) => {
  try {
    await packsAPI.deletePack(id);
  } catch (err) {
    const error = getResponseErrorMessage(err);

    dispatch(setNotice({ notice: error }));

    return rejectWithValue(error);
  }
});

type DeleteDataType = {
  cardId: string;
  packId: string;
};
type EditDataType = {
  card: EditCardRequestType;
  packId: string;
};
type DataSortType = {
  packId: string;
  direction: number;
  value: string;
};

type CardsStateType = typeof initialState;
