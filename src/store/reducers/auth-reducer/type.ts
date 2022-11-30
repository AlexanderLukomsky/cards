export type AuthDataType = {
  _id: string;
  email: string;
  name: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
  avatar?: string;
};
