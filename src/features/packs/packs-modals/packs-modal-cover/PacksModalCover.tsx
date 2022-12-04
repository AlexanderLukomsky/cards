import { ChangeEvent, FC } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';

import style from './packsModalCover.module.scss';

import { UploadButton } from 'components/upload-button';

export const PacksModalCover: FC<PacksModalCoverPropsType> = ({
  onUploadImageChangeHandler,
  onDeleteClickHandler,
  cover,
  error,
}) => {
  return (
    <div className={style.cover}>
      {cover ? (
        <>
          <div className={style.cover__head}>
            <div className={style.cover__title}>Cover</div>
            <Button variant="text" component="label">
              Change cover
              <input
                onChange={onUploadImageChangeHandler}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
            <IconButton
              onClick={onDeleteClickHandler}
              aria-label="delete"
              color="primary"
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={style.cover__image}>
            <img src={cover} alt="cover" />
          </div>
        </>
      ) : (
        <UploadButton uploadHandler={onUploadImageChangeHandler} />
      )}
      {error && <div className={style.cover__error}>{error}</div>}
    </div>
  );
};
type PacksModalCoverPropsType = {
  onUploadImageChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteClickHandler: () => void;
  cover: string | null;
  error: string | null;
};
