import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from 'common/assets/icons/incubatorLogo.svg';
import { appPath } from 'common/routes/path';
import { selectIsAuth } from 'common/selectors';
import './header.scss';
import { LoginInfo } from 'components/login-info';

export const Header = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className="header">
      <div className="container">
        <NavLink to={isAuth ? appPath.PROFILE : appPath.LOGIN}>
          <img className="header__logo" src={logo} alt="incubator logo" />
        </NavLink>
        {isAuth ? (
          <LoginInfo />
        ) : (
          <NavLink className="header__link" to={appPath.LOGIN}>
            <span>Sign in</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};
