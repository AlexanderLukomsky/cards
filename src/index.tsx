import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import { App } from 'app';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
/// gh page render
// root.render(
//   <Provider store={store}>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </Provider>
// );

reportWebVitals();
