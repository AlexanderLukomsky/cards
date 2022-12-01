import { ChangeEvent } from 'react';

import { Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './Profile.module.scss';

import backIcon from 'common/assets/icons/back.png';
import logoutIcon from 'common/assets/icons/logout.png';
import photoIcon from 'common/assets/icons/photo.png';
import defaultAva from 'common/assets/images/defaultAva.png';
import {
  selectAuthEmail,
  selectAuthName,
  selectIsAuth,
  selectProfileNotice,
  selectProfileStatus,
} from 'common/selectors';
import { selectAuthAvatar } from 'common/selectors/selectors';
import { convertImageToBase64 } from 'common/utils';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { EditableSpan } from 'components/editable-span';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { setLogout } from 'store/reducers/auth-reducer';
import { setNotice, updateProfile } from 'store/reducers/profile-reducer';

export const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);
  const name = useSelector(selectAuthName);
  const email = useSelector(selectAuthEmail);
  const avatar = useSelector(selectAuthAvatar);

  const status = useSelector(selectProfileStatus);
  const notice = useSelector(selectProfileNotice);

  if (!isAuth) {
    return <Navigate to={appPath.LOGIN} />;
  }
  const logoutHandler = (): void => {
    dispatch(setLogout());
  };
  const changeNameHandler = (name: string): void => {
    dispatch(updateProfile({ name }));
  };
  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.currentTarget;

    if (files && files.length) {
      convertImageToBase64(files[0], {
        errorHandler: (error: string) => {
          dispatch(setNotice({ notice: error }));
        },
        successHandler: image => {
          dispatch(updateProfile({ avatar: image }));
        },
      });
    }
  };
  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  return (
    <div className={styles.container}>
      <NavLink to={appPath.PACKS} className={styles.link}>
        <img src={backIcon} alt="" /> Back to Packs list
      </NavLink>
      {status === 'pending' && (
        <CircularProgress
          style={{ zIndex: '3', position: 'absolute', left: '50vw', top: '50vh' }}
        />
      )}
      <div className={styles.block}>
        <h3>Personal Information</h3>
        <div className={styles.avatarBlock}>
          <img src={avatar || defaultAva} alt="0" className={styles.avatar} />
          <label>
            <img src={photoIcon} alt="0" className={styles.photoIcon} />
            <input onChange={changeAvatarHandler} hidden type="file" accept="image/*" />
          </label>
        </div>
        <div className={styles.name}>
          <EditableSpan value={name} onChange={changeNameHandler} />
        </div>
        <div className={styles.email}>{email}</div>
        <Button
          onClick={logoutHandler}
          className={styles.button}
          variant="text"
          color="inherit"
        >
          <img src={logoutIcon} alt="0" />
          Log out
        </Button>
      </div>
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={onCloseSnackbar}
        isError
      />
    </div>
  );
};
