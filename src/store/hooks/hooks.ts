import { useDispatch } from 'react-redux';

import { AppDispatchType } from 'store/type';

export const useAppDispatch: () => AppDispatchType = useDispatch;

// custom useSelector hook:
// import { TypedUseSelectorHook,  useSelector } from 'react-redux';
// import { AppRootStateType } from 'store';
// export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
