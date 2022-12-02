import { useSelector } from 'react-redux';

import { RegistrationForm } from './registration-form';
import './registration.scss';

import { selectAuthNotice, selectAuthStatus } from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { ParticlesContainer } from 'components/particles-container';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/auth-reducer';

export const Registration = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const notice = useSelector(selectAuthNotice);
  const status = useSelector(selectAuthStatus);

  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  return (
    <div className="registration-page">
      <ParticlesContainer />
      <RegistrationForm registrationStatus={status} />
      <CustomizedSnackbar
        message={notice}
        onClose={onCloseSnackbar}
        isError={status === 'failed'}
        isOpen={!!notice}
      />
    </div>
  );
};
