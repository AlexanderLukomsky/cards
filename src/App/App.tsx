import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import '../common/styles/App.scss';
import { AppProgress } from '../Components/AppProgress';
import { AppSnackBar } from '../Components/AppSnackBar/AppSnackBar';
import { AppRoutes } from '../pages/Routes/AppRoutes';
import { useAppDispatch, useAppSelector } from '../store/store';
import { initializedApp } from './reducers/appReducer';
export function App() {
  const dispatch = useAppDispatch()
  const appState = useAppSelector(state => state.app)
  useEffect(() => {
    dispatch(initializedApp())
  }, [dispatch])
  if (!appState.isInitializedApp) {
    return <div className='app-initialized'><CircularProgress color="secondary" size="100px" thickness={1.5} /></div>
  }
  return (
    <div className="App">
      {(appState.appStatus === 'loading') && <AppProgress />}
      {/* <HashRouter> */}
      <AppRoutes />
      {/* </HashRouter> */}
      <AppSnackBar />
    </div>
  );
}
