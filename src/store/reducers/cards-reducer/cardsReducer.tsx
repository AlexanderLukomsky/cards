import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { CardsDataType, DataSortType, DeleteCardType, EditCardType } from './types';

import { cardsAPI } from 'api';
import { AddNewCardRequestType, GetCardsRequestParamsType } from 'api/cards-api';
import { Nullable, StatusType } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';
import { AppRootStateType } from 'store/type';

const initialState = {
  data: {
    page: 1,
    pageCount: 5,
    packDeckCover: null as Nullable<string>,
  } as CardsDataType,
  status: 'idle' as StatusType,
  notice: '',
  isInitialized: false,
  searchQuestionName: null as Nullable<string>,
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
      state.data.pageCount = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.data.page = action.payload;
    },
    setSearchQuestionName: (state, action: PayloadAction<Nullable<string>>) => {
      state.searchQuestionName = action.payload;
    },
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: builder => {
    const setStatusPending = (state: CardsStateType): void => {
      state.status = 'pending';
    };
    const setStatusSucceeded = (state: CardsStateType): void => {
      state.status = 'succeeded';
    };
    const handleReject = (
      state: CardsStateType,
      action: PayloadAction<string | undefined>,
    ): void => {
      state.status = 'failed';

      if (action.payload) {
        state.notice = action.payload;
      } else {
        state.notice = 'unknown error, please try again later';
      }
    };

    builder.addCase(getCards.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.data = action.payload;
      state.status = 'succeeded';
    });

    builder.addMatcher(
      isAnyOf(
        addNewCard.fulfilled,
        deleteCard.fulfilled,
        editCard.fulfilled,
        dataSort.fulfilled,
      ),
      setStatusSucceeded,
    );

    builder.addMatcher(
      isAnyOf(
        getCards.pending,
        addNewCard.pending,
        deleteCard.pending,
        editCard.pending,
        dataSort.pending,
      ),
      setStatusPending,
    );
    builder.addMatcher(
      isAnyOf(
        getCards.rejected,
        addNewCard.rejected,
        deleteCard.rejected,
        editCard.rejected,
        dataSort.rejected,
      ),
      handleReject,
    );
  },
});

export const cardsReducer = slice.reducer;

export const {
  setStatus,
  setNotice,
  setPageCount,
  setPage,
  setIsInitialized,
  setSearchQuestionName,
} = slice.actions;

export const getCards = createAsyncThunk<
  CardsDataType,
  GetCardsRequestParamsType,
  { rejectValue: string }
>('cards/get-cards', async (data, { getState, rejectWithValue }) => {
  try {
    const { cards } = getState() as AppRootStateType;
    const res = await cardsAPI.getCards({
      ...data,
      pageCount: cards.data.pageCount,
      page: cards.data.page,
      cardQuestion: cards.searchQuestionName,
    });

    return res.data;
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const addNewCard = createAsyncThunk<
  unknown,
  AddNewCardRequestType,
  { rejectValue: string }
>('cards/add-card', async (card, { dispatch, rejectWithValue }) => {
  try {
    await cardsAPI.addCard(card);
    dispatch(getCards({ cardsPack_id: card.cardsPack_id }));
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const deleteCard = createAsyncThunk<
  unknown,
  DeleteCardType,
  { rejectValue: string }
>('cards/delete-card', async (data, { dispatch, rejectWithValue }) => {
  try {
    await cardsAPI.deleteCard(data.cardId);
    dispatch(getCards({ cardsPack_id: data.packId }));
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const editCard = createAsyncThunk<unknown, EditCardType, { rejectValue: string }>(
  'cards/edit-card',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await cardsAPI.editCard(data.card);
      dispatch(getCards({ cardsPack_id: data.packId }));
    } catch (err) {
      const error = getResponseErrorMessage(err);

      return rejectWithValue(error);
    }
  },
);

export const dataSort = createAsyncThunk<unknown, DataSortType, { rejectValue: string }>(
  'cards/data-sort',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(
        getCards({
          cardsPack_id: data.packId,
        }),
      );
    } catch (err) {
      const error = getResponseErrorMessage(err);

      return rejectWithValue(error);
    }
  },
);

type CardsStateType = typeof initialState;
