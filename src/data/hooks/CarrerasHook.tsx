
import {CarrerasContext} from "../../data/context/CarrerasContext";
import { useContext } from "react";
export function useCarrerasContext(){
  const context = useContext(CarrerasContext);
  return context;
}