import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LoginForm } from './login-form/LoginForm';

import { selectAuthNotice, selectAuthStatus, selectIsAuth } from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { ParticlesContainer } from 'components/particles-container';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/auth-reducer';
import './login.scss';

export const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);
  const loginStatus = useSelector(selectAuthStatus);
  const authNotice = useSelector(selectAuthNotice);

  const handleCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  if (isAuth) {
    return <Navigate to={appPath.PACKS} />;
  }

  return (
    <div className="login-page">
      <ParticlesContainer />
      <LoginForm loginStatus={loginStatus} />
      <CustomizedSnackbar
        message={authNotice}
        onClose={handleCloseSnackbar}
        isError={loginStatus === 'failed'}
        isOpen={!!authNotice}
      />
    </div>
  );
};
