import { instance } from './instance';

import { CardType } from 'store/reducers/cards-reducer';
import { DataType } from 'store/reducers/cards-reducer/cardsReducer';

export const cardsAPI = {
  addCard(card: AddNewCardRequestType) {
    return instance.post('cards/card', { card });
  },

  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`);
  },

  editCard(card: EditCardRequestType) {
    return instance.put(`cards/card`, { card });
  },

  getCards(requestParams: CardGetType) {
    return instance.get<DataType>(`/cards/card?cardsPack`, {
      params: requestParams,
    });
  },

  setGrade(params: { grade: number; card_id: string }) {
    return instance.put('cards/grade', params);
  },
};
export type EditCardRequestType = {
  _id: string;
  comments?: string;
} & Pick<AddNewCardRequestType, 'question' | 'answer'>;
export type CardsResponseDataType = {
  cards: CardType[];
  packUserId: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: Date;
  packName: string;
};

export type CardGetType = {
  cardsPack_id: string;
  min?: number | null;
  max?: number | null;
  page?: number | null;
  pageCount?: number | null;
  cardQuestion?: string | null;
  direction?: number | null;
  value?: string | null;
};

export type AddNewCardRequestType = {
  cardsPack_id: string;
  question?: string;
  answer: string;
  // optional
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};
export type UpdatePackNameRequestType = {
  _id: string;
  name: string;
  deckCover?: string | null;
  private: boolean;
};
