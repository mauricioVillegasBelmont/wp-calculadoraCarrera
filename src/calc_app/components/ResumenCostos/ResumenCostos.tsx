import React from "react";

import {type SectionContentSchema, type CostosSchema} from "../../data/context/ContentContext";

import { useUserCarreraContext } from "../../data/hooks/UserDataHook";
import FormatCurrency from '../../Utils/FormatCurrency';


interface ResumenCostosProps{
  contents: SectionContentSchema;
  costos:CostosSchema;
}

export default function ResumenCostos(props:ResumenCostosProps){
  const {costos, contents} = props
  const currentCarrera = useUserCarreraContext()
  if(!currentCarrera) return '';

  const {
    CostoCredito,
    CuotaNuevoIngreso,
  } = costos;
  const {
    desglose = [],
  } = currentCarrera
  
  const creditos = desglose.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const FormatCurrencyFormat = {
    decimals:0 as 0|1|2,
  }
  
  const costoCreditos = FormatCurrency((CostoCredito * creditos) + CuotaNuevoIngreso, FormatCurrencyFormat);
  const cuotaNuevoIngreso = FormatCurrency(CuotaNuevoIngreso, FormatCurrencyFormat);



  return (
    <>
    <div className="component component bg-gray-50 p-6 rounded-lg shadow mb-8 font-sarabun">
      <h2 className="text-head2 text-emerald-950 font-bold text-emerald-950 mb-4">{contents.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-500 mb-auto">{contents.inscriptionCuoteLabel}</h3>
          <p className="text-2xl font-bold pt-3">{cuotaNuevoIngreso}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-500 mb-auto">{contents.totalInvestLabel}</h3>
          <p className="text-2xl font-bold pt-3">{costoCreditos}</p>
        </div>
      </div>
    </div>
    </>
  )
}