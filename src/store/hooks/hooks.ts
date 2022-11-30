import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from 'store';
import { AppDispatchType } from 'store/type';

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch: () => AppDispatchType = useDispatch;
