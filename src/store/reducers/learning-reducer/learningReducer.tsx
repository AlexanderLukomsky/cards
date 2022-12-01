import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardType } from '../cards-reducer';

import { cardsAPI } from 'api';
import { StatusType } from 'common/types';
import { getResponseErrorMessage } from 'common/utils';

const initialState = {
  data: [] as CardType[],
  packName: '',
  notice: '',
  status: 'idle' as StatusType,
  isInitialized: false,
  sortStepByStep: false,
};

const slice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setNotice(state, action: PayloadAction<{ notice: string }>) {
      state.notice = action.payload.notice;
    },
    setFilter(state, action: PayloadAction<{ filter: boolean }>) {
      state.sortStepByStep = action.payload.filter;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCards.pending, state => {
        state.status = 'pending';
      })
      .addCase(changeGradeCard.pending, state => {
        state.status = 'pending';
      })

      .addCase(getAllCards.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.packName = action.payload.packName;
        state.isInitialized = true;
        state.status = 'succeeded';
      })
      .addCase(changeGradeCard.fulfilled, (state, action) => {
        const card = state.data.find(c => c._id === action.payload.cardId);

        if (card) {
          card.shots = action.payload.shots;
          card.grade = action.payload.grade;
        }
        state.status = 'succeeded';
      })

      .addCase(changeGradeCard.rejected, (state, action) => {
        state.notice = action.payload
          ? action.payload.error
          : 'unknown error, please try again later';
        state.status = 'failed';
      })
      .addCase(getAllCards.rejected, (state, action) => {
        state.notice = action.payload
          ? action.payload.error
          : 'unknown error, please try again later';
        state.status = 'failed';
      });
  },
});

export const learningReducer = slice.reducer;
export const { setFilter, setNotice } = slice.actions;

export const getAllCards = createAsyncThunk<
  { data: CardType[]; packName: string },
  string,
  { rejectValue: { error: string } }
>('learning/getAllCards', async (id, { rejectWithValue }) => {
  try {
    const res = await cardsAPI.getCards({ cardsPack_id: id, pageCount: 100 });

    return { data: res.data.cards, packName: res.data.packName };
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue({ error });
  }
});

export const changeGradeCard = createAsyncThunk<
  { cardId: string; grade: number; shots: number },
  ChangeGradeType,
  { rejectValue: { error: string } }
>('learning/changeGrade', async (param, { rejectWithValue }) => {
  try {
    const res = await cardsAPI.setGrade({ grade: param.grade, card_id: param.idCard });

    return {
      cardId: res.data.updatedGrade.card_id,
      grade: res.data.updatedGrade.grade,
      shots: res.data.updatedGrade.shots,
    };
  } catch (err) {
    const error = getResponseErrorMessage(err);

    return rejectWithValue({ error });
  }
});

type ChangeGradeType = {
  idCard: string;
  grade: number;
};
