import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './calc_app/App';
import './calc_app/styles/reset.css';
import './calc_app/styles/style.css';
import './calc_app/styles/fix.css';
import './calc_app/styles/sarabun.css';

import {type Carrera } from './calc_app/data/context/CarrerasContext';
import {type Contents } from './calc_app/data/context/ContentContext';

const root = ReactDOM.createRoot(
  document.getElementById('calculadoraApp')!
);

import { ContentsDataProvider } from './calc_app/data/context/ContentContext';
import { UserCarreraProvider } from './calc_app/data/context/UserDataContext';
import { CarrerasDataProvider } from './calc_app/data/context/CarrerasContext';


declare global {
  interface Window {
    calc_ITAM_vars:{
      ajaxUrl:string;
      mensaje:string;
      panels:{
        carreras:{
          opciones:Carrera[];
          mensaje:string;
        },
        contents:{
          opciones:Contents;
          mensaje:string;
        },
      }
    } | undefined
  }
}

root.render(
  <React.StrictMode>
    <ContentsDataProvider>
    <CarrerasDataProvider>
    <UserCarreraProvider>
      <App />
    </UserCarreraProvider>
    </CarrerasDataProvider>
    </ContentsDataProvider>
  </React.StrictMode>
);