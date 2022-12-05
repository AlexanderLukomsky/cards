import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { CardType } from '../cards-reducer';

import { setCardGradeDataType, SetCardGradeReturnDataType } from './types';

import { cardsAPI } from 'api';
import { StatusType } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';

const initialState = {
  data: [] as CardType[],
  packName: '',
  notice: '',
  status: 'idle' as StatusType,
  isInitialized: false,
  isOrderedSort: false,
};

const slice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setNotice(state, action: PayloadAction<{ notice: string }>) {
      state.notice = action.payload.notice;
    },
    setIsOrderedSort(state, action: PayloadAction<boolean>) {
      state.isOrderedSort = action.payload;
    },
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: builder => {
    const setPendingStatus = (state: LearningStateType): void => {
      state.status = 'pending';
    };

    const handleReject = (
      state: LearningStateType,
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
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.packName = action.payload.packName;
        state.isInitialized = true;
        state.status = 'succeeded';
      })

      .addCase(setCardGrade.fulfilled, (state, action) => {
        const foundCard = state.data.find(card => card._id === action.payload.cardId);

        if (foundCard) {
          foundCard.shots = action.payload.shots;
          foundCard.grade = action.payload.grade;
        }
        state.status = 'succeeded';
      });

    builder.addMatcher(
      isAnyOf(getAllCards.pending, setCardGrade.pending),
      setPendingStatus,
    );
    builder.addMatcher(
      isAnyOf(setCardGrade.rejected, getAllCards.rejected),
      handleReject,
    );
  },
});

export const learningReducer = slice.reducer;
export const { setIsOrderedSort, setNotice, setIsInitialized } = slice.actions;

export const getAllCards = createAsyncThunk<
  { data: CardType[]; packName: string },
  string,
  { rejectValue: string }
>('learning/getAllCards', async (id, { rejectWithValue }) => {
  try {
    const res = await cardsAPI.getCards({ cardsPack_id: id, pageCount: 100 });

    return { data: res.data.cards, packName: res.data.packName };
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

export const setCardGrade = createAsyncThunk<
  SetCardGradeReturnDataType,
  setCardGradeDataType,
  { rejectValue: string }
>('learning/changeGrade', async (data, { rejectWithValue }) => {
  try {
    const res = await cardsAPI.setGrade(data);

    return {
      cardId: res.data.updatedGrade.card_id,
      grade: res.data.updatedGrade.grade,
      shots: res.data.updatedGrade.shots,
    };
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue(error);
  }
});

type LearningStateType = typeof initialState;
