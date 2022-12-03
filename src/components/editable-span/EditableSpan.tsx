import { ChangeEvent, memo, useState } from 'react';

import { Button, TextField } from '@mui/material';

import style from './EditableSpan.module.scss';

import edit from 'common/assets/icons/edit.png';

export const EditableSpan = memo(
  ({ value, onSaveButtonClickHandler }: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const handleSetEditableModeClick = (): void => {
      setIsEditMode(true);
      setTitle(value);
    };

    const handleSaveButtonClick = (): void => {
      setIsEditMode(false);
      onSaveButtonClickHandler(title);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.currentTarget.value);
    };

    if (isEditMode) {
      return (
        <div className={style.edit_mode}>
          <TextField
            value={title}
            onChange={handleTitleChange}
            label="Nickname"
            variant="standard"
            className={style.input}
          />
          <Button
            variant="contained"
            onClick={handleSaveButtonClick}
            disabled={title.length === 0}
            size="medium"
          >
            SAVE
          </Button>
        </div>
      );
    }

    return (
      <span className={style.view_mode}>
        <h3 className={style.title}>{value}</h3>

        <img
          role="presentation"
          src={edit}
          className={style.img}
          alt="edit"
          onClick={handleSetEditableModeClick}
        />
      </span>
    );
  },
);

type EditableSpanPropsType = {
  value: string;
  onSaveButtonClickHandler: (newValue: string) => void;
};
