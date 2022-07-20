import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import { AppRoutes } from './Components/Routes/AppRoutes';
import { setIsInitializedAppTC } from './store/reducers/appReducer';
import { useAppDispatch, useAppSelector } from './store/store';
function App() {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  useEffect(() => {
    dispatch(setIsInitializedAppTC())
  }, [dispatch])
  return (
    <div className="App">
      {appStatus === 'loading' && <div>LOADING APP</div>}
      {/* <HashRouter> */}
      <AppRoutes />
      {/* </HashRouter> */}
    </div>
  );
}

export default App;
