import {
  CreateNewPackRequestDataType,
  GetPacksRequestDataType,
  UpdatePackRequestDataType,
} from './types';

import { instance } from 'api/instance';
import { PacksDataType } from 'store/reducers/packs-reducer';

export const packsAPI = {
  getPacks: (data: GetPacksRequestDataType) => {
    return instance.get<PacksDataType>('/cards/pack', { data });
  },
  createNewPack: (data: CreateNewPackRequestDataType) => {
    return instance.post('/cards/pack', { data });
  },
  deletePack: (id: string) => {
    return instance.delete(`/cards/pack?id=${id}`);
  },
  updatePackName: (data: UpdatePackRequestDataType) => {
    return instance.put('/cards/pack', { data });
  },
};
