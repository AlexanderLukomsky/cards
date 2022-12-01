import { FC, ChangeEvent } from 'react';

import './uploadButtonStyle.scss';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button } from '@mui/material';

export const UploadButton: FC<UploadButtonPropsType> = ({
  uploadHandler,
  title = 'Add Cover',
}) => (
  <Button
    className="upload-button"
    variant="contained"
    color="primary"
    component="label"
    endIcon={<PhotoCamera />}
  >
    <span className="upload-button__title">{title}</span>
    <input onChange={uploadHandler} hidden accept="image/*" type="file" />
  </Button>
);
type UploadButtonPropsType = {
  uploadHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  title?: string;
};
