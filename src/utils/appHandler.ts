import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setAppMessage, setAppStatus } from "../app/reducers/appReducer";

export const handleAppNetworkError = (
  err: AxiosError<any>,
  dispatch: Dispatch
) => {
  const error: string = err.response?.data
    ? err.response.data.error
    : err.message
    ? err.message
    : "An error has occurred. Please try again later";
  dispatch(setAppStatus({ appStatus: "failed" }));
  dispatch(setAppMessage({ appMessage: error }));
};
export const handleAppSuccessProgress = (
  appMessage: string,
  dispatch: Dispatch
) => {
  dispatch(setAppStatus({ appStatus: "success" }));
  dispatch(setAppMessage({ appMessage }));
};
