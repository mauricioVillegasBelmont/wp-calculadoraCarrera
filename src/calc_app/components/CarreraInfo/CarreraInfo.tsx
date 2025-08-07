import React from "react";
import {type SectionContentSchema } from "calc_app/data/context/ContentContext";
import { useUserCarreraContext } from "../../data/hooks/UserDataHook";

interface CarreraInfoProps {
  contents: SectionContentSchema;
}

export default function CarreraInfo(props:CarreraInfoProps){
  const {contents}=props
  const currentCarrera = useUserCarreraContext()
  if(!currentCarrera) return '';
  const {
    carrera='',
    description='',
    desglose=[],
  } = currentCarrera
  const creditos = desglose.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const semestres = desglose.length;
  
  return(
    <div className="mt-4 bg-gray-50  p-4 rounded font-sarabun mb-7">
      <h1 className="none print:block font-normal mb-5 text-head1 text-emerald-950">{carrera}</h1>
      <p className="text-xl font-normal mb-5">{description}</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <p className="block font-xl text-emerald-800 mb-auto">{contents.durationLabel}:</p>
          <p className="block font-lg">{semestres} semestres</p>
        </div>
        <div className="flex flex-col">
          <p className="block font-xl text-emerald-800 mb-auto">{contents.creditsLabel}:</p>
          <p className="block font-lg">{creditos}</p>
        </div>
      </div>
    </div>
  )
}