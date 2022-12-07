export type UserType = {
  avatar: string;
  created: Date;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: number;
  updated: Date;
  verified: false;
  _id: string;
};

export type UsersDataType = {
  users: UserType[];
  maxPublicCardPacksCount: number;
  minPublicCardPacksCount: number;
  page: number;
  pageCount: number;
  usersTotalCount: number;
};
