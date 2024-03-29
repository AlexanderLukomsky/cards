import { Nullable } from 'common/types';

export type GetCardsRequestParamsType = {
  cardAnswer?: Nullable<string>;
  cardQuestion?: Nullable<string>;
  cardsPack_id: string;
  min?: Nullable<number>;
  max?: Nullable<number>;
  sortCards?: any;
  page?: Nullable<number>;
  pageCount?: Nullable<number>;
};

export type AddNewCardRequestType = {
  cardsPack_id: string;
  question?: Nullable<string>;
  answer: string;
  questionImg?: Nullable<string>;
  // optional
  grade?: number;
  shots?: number;
  answerImg?: string;

  questionVideo?: string;
  answerVideo?: string;
};

export type EditCardRequestType = {
  _id: string;
} & Partial<Pick<AddNewCardRequestType, 'question' | 'answer' | 'questionImg'>>;

export type SetGradeRequestParamsType = {
  grade: number;
  card_id: string;
};
