import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import style from './login.module.scss';
import { LoginForm } from './LoginForm/LoginForm';

import { appPath } from 'common/routes/path';
import { selectAuthNotice, selectAuthStatus, selectIsAuth } from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/auth-reducer';

export const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);
  const loginStatus = useSelector(selectAuthStatus);
  const authNotice = useSelector(selectAuthNotice);

  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  if (isAuth) {
    return <Navigate to={appPath.PACKS} />;
  }

  return (
    <div className={style.login}>
      <LoginForm loginStatus={loginStatus} />
      <CustomizedSnackbar
        message={authNotice}
        onClose={onCloseSnackbar}
        isError={loginStatus === 'failed'}
        isOpen={!!authNotice}
      />
    </div>
  );
};
