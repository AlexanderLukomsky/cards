import { instance } from './instance';

import { PacksDataType } from 'store/reducers/packs-reducer';

export const packsAPI = {
  getPacks: (params: GetPacksType) => {
    return instance.get<PacksDataType>('/cards/pack', { params });
  },
  createNewPack: (cardsPack: CreateNewPackType) => {
    return instance.post('/cards/pack', { cardsPack });
  },
  deletePack: (id: string) => {
    return instance.delete(`/cards/pack?id=${id}`);
  },
  updatePackName: (cardsPack: UpdatePackNameType) => {
    return instance.put('/cards/pack', { cardsPack });
  },
};
type GetPacksType = {
  page: number;
  pageCount: number;
  min: number | null;
  max: number | null;
  packName: string | null;
  sortPacks: string | null;
  user_id: string | null;
  // then

  block?: boolean;
};
export type CreateNewPackType = {
  name: string;
  private: boolean;
  deckCover: string | null;
};
export type UpdatePackNameType = {
  _id: string;
  name: string;
  deckCover?: string | null;
  private: boolean;
};
