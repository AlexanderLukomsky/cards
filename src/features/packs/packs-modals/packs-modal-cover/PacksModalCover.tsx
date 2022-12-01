import { ChangeEvent, FC } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';

import style from './packsModalCover.module.scss';

import { UploadButton } from 'components/upload-button';

export const PacksModalCover: FC<PacksModalCoverPropsType> = ({
  uploadHandler,
  onDeleteClick,
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
                onChange={uploadHandler}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
            <IconButton onClick={onDeleteClick} aria-label="delete" color="primary">
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={style.cover__image}>
            <img src={cover} alt="cover" />
          </div>
        </>
      ) : (
        <UploadButton uploadHandler={uploadHandler} />
      )}
      {error && <div className={style.cover__error}>{error}</div>}
    </div>
  );
};
type PacksModalCoverPropsType = {
  uploadHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: () => void;
  cover: string | null;
  error: string | null;
};
