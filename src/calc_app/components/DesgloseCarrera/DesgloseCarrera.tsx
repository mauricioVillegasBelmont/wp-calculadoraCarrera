import React from "react";

import {type SectionContentSchema, type CostosSchema} from "../../data/context/ContentContext";



import { useUserCarreraContext } from "../../data/hooks/UserDataHook";
import FormatCurrency from "../../Utils/FormatCurrency";

interface DesgloseCarreraProps {
  contents: SectionContentSchema;
  costos: CostosSchema;
  children: React.ReactNode;
}

export default function DesgloseCarrera(props:DesgloseCarreraProps){
  const {contents, costos, children} = props
  const currentCarrera = useUserCarreraContext()
  if(!currentCarrera) return '';
  const {
    desglose = [],
  } = currentCarrera
  if(desglose.length === 0 ) return (<h2 className="text-xl font-bold text-emerald-800 mb-6">Sin Información Disponible</h2>)
  const {
    CostoCredito,
    CuotaNuevoIngreso,
  } = costos;

  function reducer(accumulator:number, currentValue:number, index:number = 0) {
    const returns = accumulator + currentValue;
    return returns;
  }

  return(
    <div className="bg-white px-4 lg:px-6 py-6 rounded-lg shadow mb-8 font-sarabun">
        <h2 className="text-head2 font-bold text-emerald-950 mb-5">{contents.title}</h2>
        <p className="mb-6">{contents.inscriptionCuoteLabel}: <span className="text-emerald-600">{FormatCurrency(CuotaNuevoIngreso,{decimals:0})}</span></p>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inversión</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {desglose.map((value,index)=>(
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-emerald-600 font-medium">
                  {FormatCurrency(CostoCredito * value,{decimals:0})}
                </td>
              </tr>
              ))}
              
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-bold">Total</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold">
                  {desglose.reduce(reducer)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-emerald-600 font-bold">
                  {FormatCurrency(CostoCredito * (desglose.reduce(reducer)),{decimals:0}) }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="component chart-container mx-auto">
          {children}
        </div>
      </div>
  )
}