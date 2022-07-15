import './App.scss';
import { AppRoutes } from './Components/Routes/AppRoutes';
import { useAppSelector } from './store/store';
function App() {
  const appError = useAppSelector(state => state.app.error)
  { !!appError && alert(appError) }
  return (
    <div className="App">

      {/* <HashRouter> */}
      <AppRoutes />
      {/* </HashRouter> */}
    </div>
  );
}

export default App;
