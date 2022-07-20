import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.scss';
import { AppRoutes } from './Components/Routes/AppRoutes';
import { setIsInitializedAppTC } from './store/reducers/appReducer';
import { useAppDispatch, useAppSelector } from './store/store';
function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const appState = useAppSelector(state => state.app)
  useEffect(() => {
    dispatch(setIsInitializedAppTC())
  }, [dispatch])
  useEffect(() => {
    if (appState.isAuth) { navigate('/profile') }
  }, [navigate, appState.isAuth])
  if (!appState.isInitializedApp) return (
    <div className='start-loader'>
      <CircularProgress color="secondary" size="100px" thickness={1.5} />
    </div>
  )

  return (
    <div className="App">
      {/* <HashRouter> */}
      <AppRoutes />
      {/* </HashRouter> */}
    </div>
  );
}

export default App;
