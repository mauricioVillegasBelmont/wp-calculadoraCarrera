
import {CarrerasContext} from "../context/CarrerasContext";
import { useContext } from "react";
export function useCarrerasContext(){
  const context = useContext(CarrerasContext);
  return context;
}