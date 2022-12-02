import { FC, useState } from 'react';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { TextField, IconButton } from '@mui/material';
import { FieldInputProps } from 'formik';

import './formPassword.scss';

export const FormPassword: FC<FormPasswordPropsType> = ({
  isError,
  errorText,
  onFocus,
  fieldProps,
  className,
  label,
}) => {
  const [isShowPass, setIsShowPass] = useState(false);

  return (
    <div className={`${className ? `${className} ` : ''}form-password`}>
      <TextField
        className="form-password__input"
        label={label || 'Password'}
        variant="standard"
        type={!isShowPass ? 'password' : 'text'}
        error={isError}
        onFocus={() => onFocus && onFocus()}
        {...fieldProps}
      />
      {isError && <span className="form-password__error">{errorText}</span>}
      <span className="form-password__icon">
        {!isShowPass ? (
          <IconButton
            onClick={() => {
              setIsShowPass(true);
            }}
          >
            <RemoveRedEyeIcon color={isError ? 'error' : 'action'} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setIsShowPass(false);
            }}
          >
            <VisibilityOffIcon color={isError ? 'error' : 'action'} />
          </IconButton>
        )}
      </span>
    </div>
  );
};
type FormPasswordPropsType = {
  isError: boolean | undefined;
  errorText: string | undefined;
  onFocus?: () => void;
  fieldProps: FieldInputProps<any>;
  className?: string;
  label?: string;
};
