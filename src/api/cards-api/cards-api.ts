import {
  AddNewCardRequestType,
  EditCardRequestType,
  GetCardsRequestParamsType,
  SetGradeRequestParamsType,
} from './types';

import { instance } from 'api/instance';
import { CardsDataType } from 'store/reducers/cards-reducer';

export const cardsAPI = {
  getCards(params: GetCardsRequestParamsType) {
    return instance.get<CardsDataType>(`/cards/card`, { params });
  },

  addCard(card: AddNewCardRequestType) {
    return instance.post('cards/card', { card });
  },

  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`);
  },

  editCard(card: EditCardRequestType) {
    return instance.put(`cards/card`, { card });
  },

  setGrade(params: SetGradeRequestParamsType) {
    return instance.put('cards/grade', params);
  },
};
