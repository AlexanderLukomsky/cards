export type SortType =
  | '0cardsCount'
  | '1cardsCount'
  | '0updated'
  | '1updated'
  | '0created'
  | '1created'
  | null;
export type PackType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: Date;
  updated: Date;
  user_name: string;
  deckCover: string;
};
export type PacksDataType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};
