/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleAppNetworkError = (err: AxiosError<any>, dispatch: Dispatch): void => {
  // eslint-disable-next-line no-nested-ternary, @typescript-eslint/no-unused-vars
  const error: string = err.response?.data
    ? err.response.data.error
    : err.message
    ? err.message
    : 'An error has occurred. Please try again later';

  // dispatch(selectAppStatus({ appStatus: 'failed' }));
  // dispatch(setAppMessage({ appMessage: error }));
};
export const handleAppSuccessProgress = (
  appMessage: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: Dispatch,
): void => {
  // dispatch(setAppStatus({ appStatus: 'success' }));
  // dispatch(setAppMessage({ appMessage }));
};
