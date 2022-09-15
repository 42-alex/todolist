import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import store from './redux/store';
import './styles/main.scss';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);