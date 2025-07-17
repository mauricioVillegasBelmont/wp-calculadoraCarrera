import { useCarrerasContext } from "../hooks/CarrerasHook";
import { Carrera } from "./CarrerasContext";
import React, { createContext, ReactNode, useReducer } from "react";



interface UserCarreraProviderProps {
  children: ReactNode;
}


export const UserCarreraContext = createContext<Carrera | null>(null);
export const UserCarreraDispatchContext = createContext<React.Dispatch<CarreraAction> | null>(null);



type CarreraAction = { type: "CHANGE_CARRERA"; payload: {
  name: string; 
  carreras: Carrera[];
}};

function carreraReducer(state: Carrera | null, action: CarreraAction): Carrera | null {
  const {
    name,
    carreras,
  } = action.payload;
  switch (action.type) {
    case "CHANGE_CARRERA":
      return (
        Object.values(carreras).find(
          (carrera) => carrera.carrera === name
        ) || null
      );
    default:
      return state;
  }
}

export function UserCarreraProvider({ children }: UserCarreraProviderProps) {
  const [state, dispatch] = useReducer(carreraReducer, null);

  return (
    <UserCarreraContext.Provider value={state}>
      <UserCarreraDispatchContext.Provider value={dispatch}>
        {children}
      </UserCarreraDispatchContext.Provider>
    </UserCarreraContext.Provider>
  );
}
