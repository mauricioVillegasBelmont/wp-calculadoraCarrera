import { useUserCarreraContext } from "../../data/hooks/UserDataHook";
import React from "react";

export default function CarreraInfo(){
  const currentCarrera = useUserCarreraContext()
  if(!currentCarrera) return '';
  const {
    description='',
    desglose=[],
  } = currentCarrera
  const creditos = desglose.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const semestres = desglose.length;
  
  return(
    <div className="mt-4 bg-emerald-50 p-4 rounded">
      <p className="italic text-emerald-700">{description}</p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div className="flex flex-col"><span className="font-medium">Duración:</span><span>{semestres} semestres</span></div>
        <div className="flex flex-col"><span className="font-medium">Total créditos:</span><span>{creditos}</span></div>
      </div>
    </div>
  )
}