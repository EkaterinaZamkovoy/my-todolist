import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <AppHttpRequests /> */}
    </Provider>
  </React.StrictMode>
);

(window as any).store = store;
