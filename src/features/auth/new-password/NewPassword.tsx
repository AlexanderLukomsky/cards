import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { NewPasswordForm } from './new-password-form';

import { selectAuthNotice, selectAuthStatus } from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { ParticlesContainer } from 'components/particles-container';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/auth-reducer';
import './newPassword.scss';

export const NewPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const status = useSelector(selectAuthStatus);

  const notice = useSelector(selectAuthNotice);

  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  return (
    <div className="new-password-page">
      <ParticlesContainer />
      {status === 'pending' && (
        <CircularProgress style={{ zIndex: '3', position: 'absolute' }} />
      )}
      <NewPasswordForm />
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={onCloseSnackbar}
        isError={status === 'failed'}
      />
    </div>
  );
};
