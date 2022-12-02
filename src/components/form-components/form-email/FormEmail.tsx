import { FC } from 'react';

import { TextField } from '@mui/material';
import { FieldInputProps } from 'formik';
import './formEmail.scss';

export const FormEmail: FC<FormEmailPropsType> = ({
  isError,
  errorText,
  onFocus,
  fieldProps,
  className,
}) => {
  return (
    <div className={`${className ? `${className} ` : ''}form-email`}>
      <TextField
        className="form-email__input"
        label="Email"
        variant="standard"
        type="text"
        error={isError}
        onFocus={() => onFocus && onFocus()}
        {...fieldProps}
      />
      {isError && <span className="form-email__error">{errorText}</span>}
    </div>
  );
};
type FormEmailPropsType = {
  isError: boolean | undefined;
  errorText: string | undefined;
  onFocus?: () => void;
  fieldProps: FieldInputProps<any>;
  className?: string;
};
