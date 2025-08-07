import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface Carrera {
  carrera: string;
  description?: string;
  desglose?: number[]
}

interface CarrerasProviderProps {
  children: ReactNode;
}


export const CarrerasContext = createContext<Carrera[]>([]);

export function CarrerasDataProvider({ children }:CarrerasProviderProps) {
  const [data, setData] = useState<Carrera[]>([]);
  useEffect(() => {
    if (window.calc_ITAM_vars) {
      setData(window.calc_ITAM_vars.panels.carreras.opciones);
    }
  }, []);

  return(
    <CarrerasContext.Provider value={data}>
      {children}
    </CarrerasContext.Provider>
  );
}

