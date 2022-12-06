import { FC } from 'react';

import { SelectChangeEvent, Select, MenuItem } from '@mui/material';

import { QuestionType } from '../../add-new-card-modal';

import style from './selectQuestionType.module.scss';

export const SelectQuestionType: FC<SelectQuestionTypePropsType> = ({
  onChangeHandler,
  questionType,
}) => {
  const handleSelectChange = (e: SelectChangeEvent): void => {
    const value = e.target.value as QuestionType;

    onChangeHandler(value);
  };

  return (
    <Select className={style.select} value={questionType} onChange={handleSelectChange}>
      <MenuItem value="text">Text</MenuItem>
      <MenuItem value="image">Image</MenuItem>
    </Select>
  );
};
type SelectQuestionTypePropsType = {
  onChangeHandler: (value: QuestionType) => void;
  questionType: QuestionType;
};
