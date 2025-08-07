
import {ContentsContext} from "../context/ContentContext";
import { useContext } from "react";
export function useContentContext(){
  const context = useContext(ContentsContext);
  return context;
}