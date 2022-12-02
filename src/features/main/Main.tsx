import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAuthStatus, selectIsAuth } from 'common/selectors';
import { ParticlesContainer } from 'components/particles-container';
import { appPath } from 'components/routes/path';
import './main.scss';
import { LoginForm } from 'features/auth/login';

export const Main = (): JSX.Element => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const loginStatus = useSelector(selectAuthStatus);

  useEffect(() => {
    if (isAuth) {
      navigate(appPath.PACKS);
    }
  }, [isAuth]);

  return (
    <div className="main-page">
      <ParticlesContainer />
      <LoginForm loginStatus={loginStatus} />
    </div>
  );
};
