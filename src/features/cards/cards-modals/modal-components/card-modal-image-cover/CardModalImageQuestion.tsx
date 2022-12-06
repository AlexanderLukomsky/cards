import { ChangeEvent, FC } from 'react';

import Button from '@mui/material/Button';

import style from './cardModalImageQuestion.module.scss';

import { Nullable } from 'common/types';
import { convertImageToBase64 } from 'common/utils';

export const CardModalImageQuestion: FC<CardCoverPropsType> = ({
  image,
  onSuccessUploadImageHandler,
  onErrorUploadImageHandler,
  errorMessage,
}) => {
  const isImage = image && image !== 'url or base 64';

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.currentTarget;

    if (files && files.length) {
      convertImageToBase64(files[0], {
        errorHandler: onErrorUploadImageHandler,
        successHandler: onSuccessUploadImageHandler,
      });
    }
  };

  return (
    <div className={style.question_block}>
      {isImage && <img src={image} alt="card cover" className={style.image} />}
      {!!errorMessage && <div className={style.error}>{errorMessage}</div>}
      <Button className={style.button} component="label" variant="outlined">
        Question Image
        <input type="file" hidden onChange={handleUploadImage} accept={'image/*'} />
      </Button>
    </div>
  );
};

type CardCoverPropsType = {
  errorMessage: Nullable<string>;
  image: Nullable<string>;
  onSuccessUploadImageHandler: (value: string) => void;
  onErrorUploadImageHandler: (value: string) => void;
};
