import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { User } from './user';
import style from './userList.module.scss';
import { UsersShowNext } from './users-show-next';

import {
  selectIsAuth,
  selectUsers,
  selectUsersIsInitialized,
  selectUsersNotice,
  selectUsersPage,
  selectUsersStatus,
} from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { LoaderFullSize } from 'components/loader-full-size';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { setUsersNotice, getUsers } from 'store/reducers/users-reducer';

export const UsersList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);

  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const isInitialized = useSelector(selectUsersIsInitialized);
  const notice = useSelector(selectUsersNotice);
  const page = useSelector(selectUsersPage);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, page]);

  const handleCloseSnackbar = (): void => {
    dispatch(setUsersNotice(''));
  };

  if (!isAuth) {
    return <Navigate to={appPath.LOGIN} />;
  }

  if (!isInitialized) {
    return <LoaderFullSize />;
  }

  return (
    <div className={style.user_list}>
      {users.map(user => (
        <User
          key={user._id}
          name={user.name}
          avatar={user.avatar}
          userId={user._id}
          publicCardPacksCount={user.publicCardPacksCount}
        />
      ))}
      <UsersShowNext page={page} status={status} />

      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        isError={status === 'failed'}
        onClose={handleCloseSnackbar}
      />
      {status === 'pending' && <LoaderFullSize />}
    </div>
  );
};
