/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
import { ChangeEvent, FC, useState } from 'react';

import { IconButton } from '@mui/material';

import styles from './imageInput.module.scss';

import defaultImg from 'common/assets/images/broken-image.png';

// import { convertImageToBase64 } from 'common/utils';

type ImageInputType = {
  image: string | null;
  setImage: (value: string) => void;
};

export const ImageInput: FC<ImageInputType> = ({ image, setImage }) => {
  const [isImgBroken, setIsImgBroken] = useState(false);

  const setQuestionImgHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        // convertImageToBase64(file, (file64: string) => {
        //   setImage(file64);
        // });
      } else {
        console.error('Error: ', 'Файл слишком большого размера');
      }
    }
  };

  const errorHandler = (): void => {
    setIsImgBroken(true);
    alert('Broken image');
  };

  return (
    <div>
      {image && image !== 'url or base 64' && (
        <img
          src={isImgBroken ? defaultImg : image}
          alt="0"
          onError={errorHandler}
          className={styles.image}
        />
      )}
      <IconButton component="label">
        <div>Question Image</div>
        <input type="file" hidden onChange={setQuestionImgHandler} />
      </IconButton>
    </div>
  );
};
