import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from 'common/assets/icons/incubatorLogo.svg';
import christmasHat from 'common/assets/images/christmas-hat.png';
import { selectIsAuth } from 'common/selectors';
import './header.scss';
import { LoginInfo } from 'components/login-info';
import { appPath } from 'components/routes/path';

export const Header = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className="header">
      <div className="container header__container">
        <NavLink to={appPath.MAIN} className="header__logo-wrapper">
          <img className="header__logo" src={logo} alt="incubator logo" />
          <img className="header__hat" src={christmasHat} alt="christmas-hat" />
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
