import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface CostosSchema {
  CostoCredito: number;
  CuotaNuevoIngreso: number;
  CuotaSALITAM?: number;
  CuotaNuevoIngresoconDescuento?: number;
  ExamendeAdmision?: number;
  PaseDirecto?: number;
  SegurodeGastosMedicosMayores?: number;
  SeguroOrfandad1tutor?: number;
  SeguroOrfandad2tutores?: number;
  EstacionamientoSemestral?: number;
  EstacionamientoDiario?: number;
  EstacionamientoMensual_ago_nov?: number;
  EstacionamientoMensual_diciembre?: number;
};
export type SectionContentSchema = {[key:string]:string|string[]|number}
export interface Sections{
  HeaderContents:SectionContentSchema,
  SelectComponentContents:SectionContentSchema,
  CarreraInfoContents:SectionContentSchema,
  ResumenCostosContents:SectionContentSchema,
  DesgloseCarreraContents:SectionContentSchema,
  ChartContents:SectionContentSchema,
  ImportantInfoContents:SectionContentSchema,
  PrintInfoContents:SectionContentSchema,
}

export interface Contents{
  costos: CostosSchema;
  contents: Sections
}


interface ContentsProviderProps {
  children: ReactNode;
}

export const ContentsContext = createContext<Contents|null>(null);

export function ContentsDataProvider({ children }:ContentsProviderProps) {
  const [data, setData] = useState<Contents|null>(null);
  useEffect(() => {
    if (window.calc_ITAM_vars) {
      setData(window.calc_ITAM_vars.panels.contents.opciones);
    }
  }, []);

  return(
    <ContentsContext.Provider value={data}>
      {children}
    </ContentsContext.Provider>
  );
}
