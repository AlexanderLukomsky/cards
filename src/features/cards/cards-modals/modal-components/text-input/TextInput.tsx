import { FC, ChangeEvent } from 'react';

import { TextField } from '@mui/material';

import style from './textInput.module.scss';

import { Nullable } from 'common/types';

export const TextInput: FC<QuestionTextPropsType> = ({
  value,
  onChangeHandler,
  errorMessage,
  label,
}) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    onChangeHandler(value);
  };

  return (
    <div className={style.input_block}>
      <TextField
        className={style.input}
        error={!!errorMessage}
        color={errorMessage ? 'error' : 'info'}
        value={value}
        onChange={handleValueChange}
        label={label}
        variant="standard"
      />
      {!!errorMessage && <span className={style.error}>{errorMessage}</span>}
    </div>
  );
};

type QuestionTextPropsType = {
  value: string;
  onChangeHandler: (value: string) => void;
  errorMessage: Nullable<string>;
  label: string;
};
