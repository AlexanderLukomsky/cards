import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import emailIcon from 'common/assets/icons/mail.png';
import { FormFooter, FormTitle } from 'components/form-components';
import { appPath } from 'components/routes/path';
import './checkEmail.scss';

export const CheckEmail: FC<CheckEmailPropsType> = ({ email }) => {
  const navigate = useNavigate();

  const onBackButtonClick = (): void => {
    navigate(appPath.LOGIN);
  };

  return (
    <div className="check-email">
      <FormTitle title="Check Email" />

      <img src={emailIcon} alt="email icon" />

      <p className="check-email__text">
        We’ve sent an Email with instructions
        {email && (
          <>
            <span>to</span>
            <span>{email}</span>
          </>
        )}
      </p>

      <FormFooter buttonTitle="Back to login" onClick={onBackButtonClick} />
    </div>
  );
};

type CheckEmailPropsType = {
  email?: string;
};
