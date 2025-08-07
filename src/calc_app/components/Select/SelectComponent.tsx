import React from "react";
import Select  from 'react-select';

import {type Carrera} from "../../data/context/CarrerasContext";
import {type SectionContentSchema } from "../../data/context/ContentContext";

import {useUserChangeCarrera} from "../../data/hooks/UserDataHook";
import NoDataFound from "../NoData/NoData";



interface SelectComponentProps {
  contents: SectionContentSchema;
  carreras: Carrera[];
}
type Option = {
  value: string,
  label: string,
}
export default function SelectComponent(props:SelectComponentProps){
  const { contents, carreras } = props;
  if(carreras.length === 0) return (
    <NoDataFound/>
  )
  const changeCarrera = useUserChangeCarrera();



  const options:Option[] = carreras.map((value:Carrera)=>{
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
    <div className="component grid grid-cols-1 mb-7 font-sarabun print:hidden">
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-head2 text-emerald-950 font-bold text-emerald-950 mb-4">{contents.title}</h2>
        <div className="flex justify-end">
          <Select 
            className={"w-full py-3 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"}
            options={options}
            placeholder= 'Selecciona la carrera de tú interes.'
            onChange={(option)=>handleChange(option as Option)}
          />
        </div>
      </div>
    </div>
    </>
  )
}