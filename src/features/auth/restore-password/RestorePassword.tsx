import { ChangeEvent, useState } from 'react';

import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './restore-password.module.scss';

import mailIcon from 'common/assets/icons/mail.png';
import { selectAuthNotice, selectAuthStatus } from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { restorePassword, setNotice } from 'store/reducers/auth-reducer';

export const RestorePassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const status = useSelector(selectAuthStatus);

  const notice = useSelector(selectAuthNotice);

  const onClickHandler = (): void => {
    dispatch(restorePassword(email));
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };
  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  return (
    <>
      <div className={styles.container}>
        {true ? (
          <div className={styles.block}>
            <h3>Forgot your password?</h3>
            <TextField
              onChange={onChangeHandler}
              value={email}
              label="Email"
              variant="standard"
              className={styles.input}
            />
            <p>Enter your email address and we will send you further instructions</p>
            <Button
              onClick={onClickHandler}
              variant="contained"
              className={styles.button}
            >
              Send Instructions
            </Button>
            <p style={{ textAlign: 'center', marginTop: '31px' }}>
              Did you remember your password?
            </p>
            <a href={appPath.LOGIN}>Try logging in</a>
          </div>
        ) : (
          <div className={styles.block}>
            <h3>Check Email</h3>
            <img src={mailIcon} alt="0" style={{ marginTop: '29px' }} />
            <p style={{ textAlign: 'center' }}>
              We’ve sent an Email with instructions to <br />
              {email}
            </p>
            <Button
              onClick={() => navigate(appPath.LOGIN)}
              variant="contained"
              className={styles.button}
              style={{ marginBottom: '48px', marginTop: '41px' }}
            >
              Back to login
            </Button>
          </div>
        )}
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
