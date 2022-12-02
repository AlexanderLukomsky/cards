import { ChangeEvent, useState } from 'react';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import style from './new-password.module.scss';

import { selectAuthNotice, selectAuthStatus } from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { FormFooter, FormTitle } from 'components/form-components';
import { useAppDispatch } from 'store/hooks';
import { setNewPassword, setNotice } from 'store/reducers/auth-reducer';

export const NewPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const [password, setPassword] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(false);

  const token = params.token as string;

  const status = useSelector(selectAuthStatus);

  const notice = useSelector(selectAuthNotice);

  const onClickHandler = (): void => {
    dispatch(setNewPassword({ password, resetPasswordToken: token }));
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };
  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };
  const setVisibilityHandler = (): void => {
    setVisibility(!visibility);
  };

  return (
    <>
      <div className={style.container}>
        {status === 'pending' && (
          <CircularProgress style={{ zIndex: '3', position: 'absolute' }} />
        )}
        <div className={style.block}>
          <FormTitle title="Create new password" />
          <div className={style.inputBlock}>
            <TextField
              onChange={onChangeHandler}
              className={style.input}
              value={password}
              type={visibility ? 'text' : 'password'}
              label="Password"
              variant="standard"
            />
            <span
              role="presentation"
              className={style.visibilityIcon}
              onClick={setVisibilityHandler}
            >
              {visibility ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </span>
          </div>
          <p>Create new password and we will send you further instructions to email</p>
          <FormFooter onClick={onClickHandler} buttonTitle="Create new password" />
        </div>
      </div>
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={onCloseSnackbar}
        isError={status === 'failed'}
      />
    </>
  );
};
