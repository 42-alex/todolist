import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);