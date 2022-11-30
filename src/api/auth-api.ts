import { instance } from './instance';

export const authAPI = {
  me() {
    return instance.post<LoginResponseType>('/auth/me', {});
  },

  login(data: AuthDataType) {
    return instance.post<LoginResponseType>('auth/login', data);
  },

  logout() {
    return instance.delete('/auth/me', {});
  },

  registration(data: RegisterDataType) {
    return instance.post('/auth/register', data);
  },

  updateUser(data: EditProfileDataType) {
    return instance.put<UpdateUserType>('/auth/me', data);
  },

  forgotPassword(data: ForgotPasswordDataType) {
    return instance.post<UpdateUserType>('/auth/forgot', data);
  },

  newPassword(data: NewPasswordDataType) {
    return instance.post<UpdateUserType>('/auth/set-new-password', data);
  },
};
export type LoginResponseType = {
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: number;
  rememberMe: boolean;
  token: string;
  tokenDeathTime: number;
  updated: string;
  verified: boolean;
  __v: number;
  _id: string;
  avatar?: string;
};
export type UpdateUserType = {
  token: string;
  tokenDeathTime: number;
  updatedUser: LoginResponseType;
};
export type AuthDataType = RegisterDataType & {
  rememberMe?: boolean;
};
export type RegisterDataType = {
  email: string;
  password: string;
};
export type EditProfileDataType = {
  name: string;
  avatar?: string;
};
export type ForgotPasswordDataType = {
  email: string;
  from: string;
  message: string;
};
export type NewPasswordDataType = {
  password: string;
  resetPasswordToken: string;
};
