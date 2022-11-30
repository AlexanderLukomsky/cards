import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import defaultAva from 'common/assets/images/defaultAva.png';
import { appPath } from 'common/routes/path';
import { selectUserAvatar, selectUserName } from 'common/selectors';
import './loginInfo.scss';

export const LoginInfo = (): JSX.Element => {
  const userAvatar = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);

  return (
    <div className="login-info">
      <NavLink className="login-info__nickname" to={appPath.PROFILE}>
        {userName}
      </NavLink>
      <img
        className="login-info__avatar"
        src={userAvatar || defaultAva}
        alt="user avatar"
      />
    </div>
  );
};
