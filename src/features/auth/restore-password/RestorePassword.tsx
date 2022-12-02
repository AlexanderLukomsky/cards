import { useState } from 'react';

import { useSelector } from 'react-redux';

import { RestorePasswordForm } from './restore-password-form';
import './restore-password.scss';

import { selectAuthNotice, selectAuthStatus } from 'common/selectors';
import { CheckEmail } from 'components/check-email';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { ParticlesContainer } from 'components/particles-container';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/auth-reducer';

export const RestorePassword = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [isSucceeded, setIsSucceeded] = useState(false);

  const status = useSelector(selectAuthStatus);

  const notice = useSelector(selectAuthNotice);

  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };
  const handleSubmitForm = (value: string): void => {
    setIsSucceeded(true);
    setEmail(value);
  };

  return (
    <div className="restore-password-page">
      <ParticlesContainer />
      {isSucceeded ? (
        <CheckEmail email={email} />
      ) : (
        <RestorePasswordForm onSubmitHandler={handleSubmitForm} />
      )}
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={onCloseSnackbar}
        isError={status === 'failed'}
      />
    </div>
  );
};
