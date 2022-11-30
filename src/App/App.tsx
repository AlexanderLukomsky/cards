import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { AppRoutes } from 'common/routes';
import { selectAppStatus, selectIsInitializedApp } from 'common/selectors';
import { Header } from 'components/header';
import { LoaderFullSize } from 'components/loader-full-size';
import { useAppDispatch } from 'store/hooks';
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
      <div className="app">
        <Header />
        <LoaderFullSize />;
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="container">
        <AppRoutes />
      </div>

      {appStatus === 'pending' && <LoaderFullSize />}
    </div>
  );
};
