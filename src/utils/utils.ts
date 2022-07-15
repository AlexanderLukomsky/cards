import { Dispatch } from 'redux';
import { setAppError, SetAppErrorType } from '../store/reducers/appReducer';
export const handleAppError = (error: string, dispatch: Dispatch<SetAppErrorType>) => {
    dispatch(setAppError(error))
}