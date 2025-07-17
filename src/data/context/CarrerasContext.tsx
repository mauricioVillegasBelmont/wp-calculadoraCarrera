import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface Carrera {
  carrera: string;
  description?: string;
  desglose?: number[]
}
declare global {
  interface Window {
    calc_ITAM_data:{
      ajaxUrl:string;
      mensaje:string;
      opciones:Carrera[];
    } | undefined
  }
}
interface CarrerasProviderProps {
  children: ReactNode;
}




export const CarrerasContext = createContext<Carrera[]>([]);

export function CarrerasDataProvider({ children }:CarrerasProviderProps) {
  const [data, setData] = useState<Carrera[]>([]);
  useEffect(() => {
    if (window.calc_ITAM_data) {
      setData(window.calc_ITAM_data.opciones);
    }
  }, []);

  return(
    <CarrerasContext.Provider value={data}>
      {children}
    </CarrerasContext.Provider>
  );
}

