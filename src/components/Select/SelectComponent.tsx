import React from "react";
import Select  from 'react-select';

import {type Carrera} from "../../data/context/CarrerasContext";

import CarreraInfo from "../CarreraInfo/CarreraInfo";
import NoDataFound from "../NoData/NoData";

import {useUserChangeCarrera} from "../../data/hooks/UserDataHook";
import { useCarrerasContext } from "../../data/hooks/CarrerasHook";


type Option = {
  value: string,
  label: string,
}
export default function SelectComponent(){
  const changeCarrera = useUserChangeCarrera();
 
  const Carreras = useCarrerasContext();
  if(Carreras.length === 0) return (
    <NoDataFound/>
  )



  const options:Option[] = Carreras.map((value:Carrera)=>{
    return{
      value: value.carrera,
      label: value.carrera,
    }
  })
  const handleChange = (selectedOption:Option) => {
    changeCarrera(selectedOption.value)
  };

  return(
    <>      
    <div className="grid grid-cols-1 mb-8">
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-emerald-800 mb-4">Selecciona tu Carrera</h2>
        <Select 
          className={"w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"}
          options={options}
          placeholder= 'Selecciona la carrera de tú interes.'
          onChange={(option)=>handleChange(option as Option)}
        />
      </div>

      <CarreraInfo/>
    </div>
    </>
  )
}