import React from 'react';
import MainLayout from './layout/main';




import { useCarrerasContext } from './data/hooks/CarrerasHook';
import { useContentContext } from './data/hooks/ContentHook';

import Preloader from './components/Preloader/Preloader';
import Header from './components/header/Header';
import SelectComponent from './components/Select/SelectComponent';
import CarreraInfo from "./components/CarreraInfo/CarreraInfo";
import ResumenCostos from './components/ResumenCostos/ResumenCostos';
import DesgloseCarrera from "./components/DesgloseCarrera/DesgloseCarrera";
import ChartComponent from "./components/ChartComponent/ChartComponent";
import ImportantInfo from './components/ImportantInfo/ImportantInfo';






export default function App() {
 
  const Contents = useContentContext();   
  const Carreras = useCarrerasContext();

  if(Contents === null) return (
    <Preloader />
  );
  const { costos, contents } = Contents;
  console.log(contents)
  const {
    HeaderContents,
    SelectComponentContents,
    CarreraInfoContents,
    ResumenCostosContents,
    DesgloseCarreraContents,
    ChartContents,
    ImportantInfoContents,
    PrintInfoContents,
  } = contents

  return (
    <>
    <MainLayout contents={PrintInfoContents}>
      
        <Header contents={HeaderContents} />
        <SelectComponent carreras={Carreras} contents={SelectComponentContents} />
        <CarreraInfo contents={CarreraInfoContents} />
        <ResumenCostos costos={costos} contents={ResumenCostosContents} />
        <DesgloseCarrera costos={costos} contents={DesgloseCarreraContents}>
          <ChartComponent costos={costos} contents={ChartContents} type="bar"chartId="unique-chart-1" />
        </DesgloseCarrera>
        <ImportantInfo contents={ImportantInfoContents} />
    </MainLayout>
    </>
  );
}
/*
{currentCarrera && (
)}
 */