import { Dispatch } from 'redux';
import { setAppErrorAC, SetAppErrorType } from '../store/reducers/appReducer';
export const handleAppError = (error: string, dispatch: Dispatch<SetAppErrorType>) => {
    dispatch(setAppErrorAC(error))
}