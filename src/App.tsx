import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import { AppRoutes } from './Components/Routes/AppRoutes';
import { ErrorSnackbars } from './Components/Snackbar/ErrorSnackbars';
import { setIsInitializedAppTC } from './store/reducers/appReducer';
import { useAppDispatch, useAppSelector } from './store/store';
function App() {

  const dispatch = useAppDispatch()
  const appState = useAppSelector(state => state.app)
  useEffect(() => {
    dispatch(setIsInitializedAppTC())
  }, [dispatch])
  if (!appState.isInitializedApp) return (
    <div className='start-loader'>
      <CircularProgress color="secondary" size="100px" thickness={1.5} />
    </div>
  )
  return (
    <div className="App">
      <HashRouter>
        <AppRoutes />
      </HashRouter>
      {!!appState.error && <ErrorSnackbars />}
    </div>
  );
}

export default App;
