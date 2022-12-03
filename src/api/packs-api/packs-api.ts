import {
  CreateNewPackRequestDataType,
  GetPacksRequestParamsType,
  UpdatePackRequestDataType,
} from './types';

import { instance } from 'api/instance';
import { PacksDataType } from 'store/reducers/packs-reducer';

export const packsAPI = {
  getPacks: (params: GetPacksRequestParamsType) => {
    return instance.get<PacksDataType>('/cards/pack', { params });
  },
  createNewPack: (cardsPack: CreateNewPackRequestDataType) => {
    return instance.post('/cards/pack', { cardsPack });
  },
  deletePack: (id: string) => {
    return instance.delete(`/cards/pack?id=${id}`);
  },
  updatePackName: (data: UpdatePackRequestDataType) => {
    return instance.put('/cards/pack', { data });
  },
};
