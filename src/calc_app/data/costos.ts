export interface CostosSchema {
  CostoCredito: number;
  CuotaSALITAM: number;
  CuotaNuevoIngreso: number;
  CuotaNuevoIngresoconDescuento: number;
  ExamendeAdmision: number;
  PaseDirecto: number;
  SegurodeGastosMedicosMayores: number;
  SeguroOrfandad1tutor: number;
  SeguroOrfandad2tutores: number;
  EstacionamientoSemestral: number;
  EstacionamientoDiario: number;
  EstacionamientoMensual_ago_nov: number;
  EstacionamientoMensual_diciembre: number;
};


const Costos:CostosSchema = {
  CostoCredito: 4100,
  CuotaSALITAM: 350,
  CuotaNuevoIngreso: 21000,
  CuotaNuevoIngresoconDescuento: 10500,
  ExamendeAdmision: 895,
  PaseDirecto: 420,
  SegurodeGastosMedicosMayores: 3208.7,
  SeguroOrfandad1tutor: 1653,
  SeguroOrfandad2tutores: 2892.50,
  EstacionamientoSemestral: 5985,
  EstacionamientoDiario: 70,
  EstacionamientoMensual_ago_nov: 1300,
  EstacionamientoMensual_diciembre: 975,
};
export default Costos;