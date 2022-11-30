import { useEffect } from 'react';

import { CircularProgress } from '@mui/material';

import 'app/style/app.scss';
import { AppProgress } from '../components/AppProgress';
import { AppSnackBar } from '../components/AppSnackBar/AppSnackBar';
import { useAppDispatch, useAppSelector } from '../store/store';

import { initializedApp } from './reducers/appReducer';

import { AppRoutes } from 'common/routes';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(state => state.app);

  useEffect(() => {
    dispatch(initializedApp());
  }, [dispatch]);

  if (!appState.isInitializedApp) {
    return (
      <div className="app-initialized">
        <CircularProgress color="secondary" size="100px" thickness={1.5} />
      </div>
    );
  }

  return (
    <div className="App">
      {appState.appStatus === 'loading' && <AppProgress />}
      <AppRoutes />
      <AppSnackBar />
    </div>
  );
};
