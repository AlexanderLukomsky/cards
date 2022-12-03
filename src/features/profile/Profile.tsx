import { ChangeEvent } from 'react';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import style from './Profile.module.scss';

import backIcon from 'common/assets/icons/back.png';
import logoutIcon from 'common/assets/icons/logout.png';
import photoIcon from 'common/assets/icons/photo.png';
import defaultAva from 'common/assets/images/defaultAva.png';
import { selectAuthEmail, selectAuthName, selectIsAuth } from 'common/selectors';
import {
  selectAuthAvatar,
  selectAuthNotice,
  selectAuthStatus,
} from 'common/selectors/selectors';
import { convertImageToBase64 } from 'common/utils';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { EditableSpan } from 'components/editable-span';
import { FormTitle } from 'components/form-components';
import { LoaderFullSize } from 'components/loader-full-size';
import { ParticlesContainer } from 'components/particles-container';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { logout, setNotice, updateProfile } from 'store/reducers/auth-reducer';

export const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);
  const name = useSelector(selectAuthName);
  const email = useSelector(selectAuthEmail);
  const avatar = useSelector(selectAuthAvatar);

  const status = useSelector(selectAuthStatus);
  const notice = useSelector(selectAuthNotice);

  const handleLogoutClick = (): void => {
    dispatch(logout());
  };

  const handleSaveButtonClick = (name: string): void => {
    dispatch(updateProfile({ name }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.currentTarget;

    if (files && files.length) {
      convertImageToBase64(files[0], {
        errorHandler: (error: string) => {
          dispatch(setNotice({ notice: error }));
        },
        successHandler: avatar => {
          dispatch(updateProfile({ avatar }));
        },
      });
    }
  };

  const handleCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  if (!isAuth) {
    return <Navigate to={appPath.LOGIN} />;
  }

  return (
    <div className={style.profile_page}>
      <ParticlesContainer />
      <NavLink to={appPath.PACKS} className={style.back_link}>
        <img src={backIcon} alt="arrow back" /> Back to Packs list
      </NavLink>

      <div className={style.profile_description}>
        <FormTitle title="Personal Information" />
        <div className={style.avatar_block}>
          <img src={avatar || defaultAva} alt="user avatar" className={style.avatar} />

          <label>
            <img src={photoIcon} alt="icon select" className={style.photo_icon} />
            <input onChange={handleAvatarChange} hidden type="file" accept="image/*" />
          </label>
        </div>

        <EditableSpan value={name} onSaveButtonClickHandler={handleSaveButtonClick} />

        <div className={style.email}>{email}</div>

        <Button
          onClick={handleLogoutClick}
          className={style.button}
          variant="text"
          color="inherit"
        >
          <img src={logoutIcon} alt="logout icon" />
          Log out
        </Button>
      </div>

      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={handleCloseSnackbar}
        isError={status === 'failed'}
      />
      {status === 'pending' && <LoaderFullSize />}
    </div>
  );
};
