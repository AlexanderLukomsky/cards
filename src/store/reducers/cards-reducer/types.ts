import { Nullable } from 'common/types';

export type CardType = {
  answer: string;
  answerImg: Nullable<string>;
  answerVideo: string;
  cardsPack_id: string;
  comments: string;
  created: Date;
  grade: number;
  more_id: string;
  question: string;
  questionImg: Nullable<string>;
  questionVideo: Nullable<string>;
  rating: number;
  shots: number;
  type: string;
  updated: Date;
  user_id: string;
  __v: number;
  _id: string;
};

export type CardsDataType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
  packCreated: Date;
  packDeckCover: Nullable<string>;
  packName: string;
  packPrivate: boolean;
  packUpdated: Date;
  token: string;
  tokenDeathTime: number;
};

export type DeleteCardType = {
  cardId: string;
  packId: string;
};

export type EditCardType = {
  card: {
    _id: string;
    question?: Nullable<string>;
    questionImg?: Nullable<string>;
    answer?: string;
  };
  packId: string;
};
export type DataSortType = {
  packId: string;
  direction: number;
  value: string;
};
