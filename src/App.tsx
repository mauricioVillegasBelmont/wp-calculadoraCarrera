import React from 'react';
import MainLayout from './layout/main';


import Header from './components/header/Header';
import ImportantInfo from './components/ImportantInfo/ImportantInfo';
import SelectComponent from './components/Select/SelectComponent';
import ResumenCostos from './components/ResumenCostos/ResumenCostos';




export default function App() {

  return (
    <>
    <MainLayout>
      <Header />
      <SelectComponent />
      <ResumenCostos />
      <ImportantInfo />
    </MainLayout>
    </>
  );
}
