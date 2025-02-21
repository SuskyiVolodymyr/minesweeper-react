import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(<Root />);
