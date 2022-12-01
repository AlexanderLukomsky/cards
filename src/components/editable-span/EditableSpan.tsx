import { ChangeEvent, memo, useState } from 'react';

import { Button, TextField } from '@mui/material';

import styles from './EditableSpan.module.scss';

import edit from 'common/assets/icons/edit.png';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = memo(({ value, onChange }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = (): void => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <div className={styles.inputField}>
      <TextField
        value={title}
        onChange={changeTitle}
        autoFocus
        label="Nickname"
        variant="standard"
        className={styles.input}
      />
      <Button
        variant="contained"
        className={styles.saveButton}
        onClick={activateViewMode}
        disabled={title.length === 0}
        size="small"
      >
        SAVE
      </Button>
    </div>
  ) : (
    <span>
      {value}
      <img
        role="presentation"
        src={edit}
        className={styles.penImg}
        alt="edit"
        onClick={activateEditMode}
      />
    </span>
  );
});
