import { GetUsersRequestType } from './types';

import { instance } from 'api/instance';
import { UsersDataType } from 'store/reducers/users-reducer';

export const usersAPI = {
  getUsers: (params: GetUsersRequestType) => {
    return instance.get<UsersDataType>('/social/users', { params });
  },
};
