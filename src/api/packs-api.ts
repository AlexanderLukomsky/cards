import { instance } from './instance';

export const packsAPI = {
  getPacks(requestParams?: RequestModelType) {
    return instance.get<PacksResponseDataType>('/cards/pack', {
      params: requestParams,
    });
  },

  addNewPack(name: string) {
    return instance.post('/cards/pack', { cardsPack: { name } });
  },

  deletePack(id: string) {
    return instance.delete(`/cards/pack?id=${id}`);
  },

  updatePackName: (cardsPack: UpdatePackNameRequestType) => {
    return instance.put('/cards/pack', { cardsPack });
  },
};
export type PacksResponseDataType = {
  cardPacks: PacksType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: number;
};
export type PacksType = {
  cardsCount: number;
  created: string;
  deckCover: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: Date;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};
export type RequestModelType = {
  pageCount?: number;
  page?: number;
  min?: number | null;
  max?: number | null;
  packName?: string | null;
  user_id?: string | null;
};
export type UpdatePackNameRequestType = {
  _id: string;
  name: string;
  deckCover?: string | null;
  private: boolean;
};
