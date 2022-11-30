import { FC } from 'react';

import { CircularProgress } from '@mui/material';

import './loaderFullSize.scss';

export const LoaderFullSize: FC<LoaderFullSizePropsType> = ({ color }) => (
  <div className="loader-full-size">
    <CircularProgress color={color} />
  </div>
);
type LoaderFullSizePropsType = {
  color?:
    | 'secondary'
    | 'primary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
    | undefined;
};
