import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter
    basename={process.env.NODE_ENV === 'production' ? '/my-todolist' : '/'}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

(window as any).store = store;
