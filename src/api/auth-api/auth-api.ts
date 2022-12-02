import {
  LoginRequestDataType,
  NewPasswordRequestDataType,
  RegistrationRequestDataType,
  RestorePasswordRequestDataType,
  UpdateProfileRequestDataType,
} from './types';

import { instance } from 'api/instance';
import { AuthDataType } from 'store/reducers/auth-reducer';

export const authAPI = {
  me() {
    return instance.post<AuthDataType>('/auth/me', {});
  },

  logout() {
    return instance.delete('/auth/me', {});
  },

  login(data: LoginRequestDataType) {
    return instance.post<AuthDataType>('auth/login', data);
  },

  registration(data: RegistrationRequestDataType) {
    return instance.post('/auth/register', data);
  },

  newPassword(data: NewPasswordRequestDataType) {
    return instance.post('/auth/set-new-password', data);
  },

  updateProfile(data: UpdateProfileRequestDataType) {
    return instance.put<{ updatedUser: AuthDataType }>('auth/me', data);
  },

  restorePassword(data: RestorePasswordRequestDataType) {
    return instance.post('/auth/forgot', data);
  },
};
