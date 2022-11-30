import { useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { AppProgress } from '../components/AppProgress';
import { AppSnackBar } from '../components/AppSnackBar/AppSnackBar';
import { useAppDispatch } from '../store/store';

import { AppRoutes } from 'common/routes';
import { selectAppStatus, selectIsInitializedApp } from 'common/selectors';
import { initializeApp } from 'store/reducers';

import 'app/style/app.scss';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isInitialized = useSelector(selectIsInitializedApp);
  const appStatus = useSelector(selectAppStatus);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="app-initialized">
        <CircularProgress color="secondary" size="100px" thickness={1.5} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="container">
        <AppRoutes />
        <AppSnackBar />
      </div>

      {appStatus === 'pending' && <AppProgress />}
    </div>
  );
};
