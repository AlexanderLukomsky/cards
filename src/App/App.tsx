import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import '../common/styles/App.scss';
import { AppProgress } from '../Components/AppProgress';
import { AppSnackBar } from '../Components/AppSnackBar/AppSnackBar';
import { AppRoutes } from '../pages/Routes/AppRoutes';
import { useAppDispatch, useAppSelector } from '../store/store';
import { initializedApp } from './reducers/appReducer';
function App() {
  const dispatch = useAppDispatch()
  const appState = useAppSelector(state => state.app)
  const packsStatus = useAppSelector(state => state.packs.packsStatus)
  useEffect(() => {
    dispatch(initializedApp())
  }, [dispatch])
  if (!appState.isInitializedApp) {
    return <div className='app-initialized'><CircularProgress color="secondary" size="100px" thickness={1.5} /></div>
  }
  return (
    <div className="App">
      {(appState.appStatus === 'loading' || packsStatus === 'loading') && <AppProgress />}
      {/* <HashRouter> */}
      <AppRoutes />
      {/* </HashRouter> */}
      <AppSnackBar />
    </div>
  );
}

export default App;
