import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

const root = ReactDOM.createRoot(
  document.getElementById('calculadoraApp')!
);

import { UserCarreraProvider } from './data/context/UserDataContext';
import { CarrerasDataProvider } from './data/context/CarrerasContext';

root.render(
  <React.StrictMode>
    <CarrerasDataProvider>
    <UserCarreraProvider>
      <App />
    </UserCarreraProvider>
    </CarrerasDataProvider>
  </React.StrictMode>
);