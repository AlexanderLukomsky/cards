import { Nullable } from 'common/types';

export type SelectedCardType = OpenModalDataType & {
  questionType: QuestionType;
};

export type OpenModalDataType = {
  cardId: string;
  packId: string;
  question: string;
  answer: string;
  questionImg: Nullable<string>;
};

export type QuestionType = 'text' | 'image';
