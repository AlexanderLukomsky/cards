import { useSelector } from 'react-redux';

import { NewPasswordForm } from './new-password-form';

import { selectAuthNotice, selectAuthStatus } from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { LoaderFullSize } from 'components/loader-full-size';
import { ParticlesContainer } from 'components/particles-container';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/auth-reducer';
import './newPassword.scss';

export const NewPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const authStatus = useSelector(selectAuthStatus);

  const notice = useSelector(selectAuthNotice);

  const handleCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  return (
    <div className="new-password-page">
      <ParticlesContainer />
      <NewPasswordForm status={authStatus} />
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={handleCloseSnackbar}
        isError={authStatus === 'failed'}
      />
      {authStatus === 'pending' && <LoaderFullSize />}
    </div>
  );
};
