import { instance } from './instance';

import { AuthDataType, LoginRequestType } from 'store/reducers/auth-reducer';

export const authAPI = {
  me() {
    return instance.post<AuthDataType>('/auth/me', {});
  },

  logout() {
    return instance.delete('/auth/me', {});
  },

  login(data: LoginRequestType) {
    return instance.post<AuthDataType>('auth/login', data);
  },

  registration(data: RegistrationDataType) {
    return instance.post('/auth/register', data);
  },

  newPassword(data: NewPasswordDataType) {
    return instance.post('/auth/set-new-password', data);
  },

  updateProfile(data: UpdateProfileType) {
    return instance.put<{ updatedUser: AuthDataType }>('auth/me', data);
  },

  restorePassword(data: RestorePasswordDataType) {
    return instance.post('/auth/forgot', data);
  },
};

export type UpdateProfileType = {
  name?: string;
  avatar?: string;
};

export type RegistrationDataType = {
  email: string;
  password: string;
};

export type RestorePasswordDataType = {
  email: string;
  from: string;
  message: string;
};
export type NewPasswordDataType = {
  password: string;
  resetPasswordToken: string;
};
