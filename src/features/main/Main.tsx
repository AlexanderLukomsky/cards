import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { appPath } from 'common/routes/path';
import { selectIsAuth } from 'common/selectors';

export const Main = (): JSX.Element => {
  const [btnStyle, setBtnStyle] = useState<' base' | ' intervalColor'>(' base');
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      navigate(appPath.PACKS);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const id = setInterval(() => {
      if (btnStyle === ' base') {
        setBtnStyle(' intervalColor');

        return;
      }

      setBtnStyle(' base');
      // eslint-disable-next-line no-magic-numbers
    }, 1300);

    return () => {
      clearInterval(id);
    };
  }, [btnStyle]);

  return (
    <div>
      <div className="main">
        <div className="main__columns container">
          <div className="main__column">
            <div className={`main__reg-btn${btnStyle}`}>
              {/* <NavLink to={`${appPath.FORM}${appPath.REGISTRATION}`}>
                REGISTRATION
              </NavLink> */}
            </div>
          </div>
          <div className="main__column-login">{/* <Login /> */}</div>
        </div>
      </div>
    </div>
  );
};
