import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { SetPacksStatusACType } from '../pages/Packs/_packsReducer/packsReducer';
import { setAppErrorAC, SetAppErrorType } from '../store/reducers/appReducer';
import { StatusType } from '../_types/types';
export const handleAppError = (error: string, dispatch: Dispatch<SetAppErrorType>) => {
	dispatch(setAppErrorAC({ error }))
}

export const handleError = (
	e: any,
	dispatch: Dispatch<HandlerErrorDispatchType>,
	statusHandler?: (status: StatusType) => StatusHandlerType
) => {
	const error = (e as AxiosError).response?.data ? e.response.data.error : 'Some Error'
	dispatch(setAppErrorAC({ error }))
	statusHandler && dispatch(statusHandler('failed'))
}
type StatusHandlerType = SetPacksStatusACType
type HandlerErrorDispatchType = SetPacksStatusACType | SetAppErrorType