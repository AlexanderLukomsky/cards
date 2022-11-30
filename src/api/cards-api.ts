import { instance } from './instance';

export const cardsAPI = {
  addCard(model: AddCardModelType) {
    return instance.post('cards/card', { card: model });
  },

  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`);
  },

  editCard(card: EditCardRequestType) {
    return instance.put(`cards/card`, { card });
  },

  getCards(requestParams: RequestParamsType) {
    return instance.get<CardsResponseDataType>(`/cards/card?cardsPack`, {
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
  cards: CardsType[];
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
export type CardsType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: Date;
  updated: Date;
  __v: number;
};
export type RequestParamsType = {
  cardsPack_id: string;
  page: number;
  pageCount: number;
  cardAnswer?: string | null;
  cardQuestion?: string | null;
};
export type AddCardModelType = {
  question: string;
  answer: string;
  cardsPack_id: string;
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
