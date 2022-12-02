import { Nullable } from 'common/types';

export type GetPacksRequestDataType = {
  page: number;
  pageCount: number;
  min: Nullable<number>;
  max: Nullable<number>;
  packName: Nullable<string>;
  sortPacks: Nullable<string>;
  user_id: Nullable<string>;
  block?: boolean;
};

export type CreateNewPackRequestDataType = {
  name: string;
  private: boolean;
  deckCover: Nullable<string>;
};
export type UpdatePackRequestDataType = {
  _id: string;
  name: string;
  deckCover?: Nullable<string>;
  private: boolean;
};
