import React, { useEffect, useRef, useState } from "react";

import { useUserCarreraContext } from "../../data/hooks/UserDataHook";
import { useCarrerasContext } from "../../data/hooks/CarrerasHook";

import Costos from "../../data/costos";
import DesgloseCarrera from "../DesgloseCarrera/DesgloseCarrera";
import ChartComponent from "../ChartComponent/ChartComponent";

import FormatCurrency from "../../Utils/FormatCurrency";


export default function ResumenCostos(){
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  

  
  const Carreras = useCarrerasContext();
  const currentCarrera = useUserCarreraContext()
  if(!currentCarrera || Carreras.length === 0) return '';
  
  const {
    desglose = [],
  } = currentCarrera
  const {
    CostoCredito,
    CuotaNuevoIngreso,
  } = Costos;
  const creditos = desglose.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  const costoCreditos = FormatCurrency(CostoCredito * creditos,{decimals:0});
  const cuotaNuevoIngreso = FormatCurrency(CuotaNuevoIngreso,{decimals:0});


  

  return (
    <>
    <div className="bg-gray-50 p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-bold text-emerald-800 mb-4">Resumen de Costos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-medium text-gray-500">Cuota Única de Primer Ingreso</h3>
          <p className="text-2xl font-bold">{cuotaNuevoIngreso}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-medium text-gray-500">Costo Total Sin Beca</h3>
          <p className="text-2xl font-bold">{costoCreditos}</p>
        </div>
      </div>

    </div>
    
    <DesgloseCarrera>
      <ChartComponent data={desglose} type="bar" width={width}  />
    </DesgloseCarrera>
    
    </>
  )
}