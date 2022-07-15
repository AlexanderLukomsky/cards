import './App.scss';
import { AppRoutes } from './Components/Routes/AppRoutes';
function App() {
  return (
    <div className="App">
      {/* <HashRouter> */}
      <AppRoutes />
      {/* </HashRouter> */}
    </div>
  );
}

export default App;
