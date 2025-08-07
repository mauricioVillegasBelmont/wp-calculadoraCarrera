import { useContext } from "react";
import { UserCarreraContext, UserCarreraDispatchContext } from "../context/UserDataContext";

import { useCarrerasContext } from "./CarrerasHook";

export function useUserCarreraContext() {
  const context = useContext(UserCarreraContext);
  if (!context && context !== null) throw new Error("App context error!!");
  return context;
}

export function useUserCarreraDispatch() {
  const context = useContext(UserCarreraDispatchContext);
  if (context === null) throw new Error("UserCarreraDispatchContext not available");
  return context;
}

export function useUserChangeCarrera() {
  const Carreras = useCarrerasContext()
  const dispatch = useUserCarreraDispatch();
  return function changeCarrera(name: string) {
    dispatch({ 
      type: "CHANGE_CARRERA", 
      payload: {
        name: name, 
        carreras:Carreras
      } 
    });
  };
}

