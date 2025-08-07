import React, {useRef, useState}  from 'react';

import {type SectionContentSchema } from 'calc_app/data/context/ContentContext';

import { useReactToPrint } from "react-to-print";
import { useUserCarreraContext } from "../data/hooks/UserDataHook";

import itam_logo from '../assets/img/itam_logo.svg';

interface MainLayoutProps {
  contents: SectionContentSchema;
  children: React.ReactNode;
}

export default function MainLayout({ contents, children }: MainLayoutProps){
  const [loading, setLoading] = useState<boolean>(false);
   const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ 
      contentRef,
      documentTitle:'Presupuesto_estimado_de_tu_carrera',
      onBeforePrint: () => {
        setLoading(true);
        return new Promise(resolve => {
          window.dispatchEvent(new Event('beforeprint'));
          setTimeout(() => {
            resolve();
          }, 1500);
        });
      },
      onAfterPrint: () => {
        window.dispatchEvent(new Event('afterprint') );
        setLoading(false);
      }
    });
    const currentCarrera = useUserCarreraContext()
    
    const printBtnText = loading ? "LOADING...": contents.cta
  return(
    <>
    <div ref={contentRef} className='mb-7 print:px-8 print:py-8'>
      <div className="hidden print:block border-b-3 border-emerald-800 mb-7 py-7">
        <img src={itam_logo} alt="Instituto Tecnológico Autónomo de México" width='350' className='max-w-1/3' />
      </div>
      <div  data-mode="light" className="min-h-full w-full font-sarabun text-base">
        <div className="flex flex-col px-4 lg:px-6 py-6 bg-white text-gray-800 max-w-5xl mx-auto">
          {children}
        </div>
      </div>
      <div className="hidden print:block border-t-3 border-emerald-800 mt-7 py-7">
        <h2 className="text-head1 text-emerald-950 font-bold mb-4">Contacto</h2>
        {contents.conmutador && <p><span className="font-bold">Conmutador:</span> {contents.conmutador}</p>}
        {contents.interior && <p><span className="font-bold">Interior de la República:</span> {contents.interior}</p>}
        {contents.eeuu && <p><span className="font-bold">EEUU:</span> {contents.eeuu}</p>}
        {contents.mundo && <p><span className="font-bold">Resto del Mundo:</span> {contents.mundo}</p>}
      </div>
    </div>
    {currentCarrera && (
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <div className=" grid grid-cols-1 mb-7 font-sarabun ">
          <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col lg:flex-row justify-between items-center gap-4">
            <h2 className="text-head2 text-emerald-950 font-bold text-emerald-950 flex-1">{contents.title}</h2>
            <button onClick={reactToPrintFn} className="text-white font-bold px-4 py-2 rounded bg-emerald-800 hover:bg-gray-950 transition my-auto hover:bg-emerald-800" aria-label='print'>
              {printBtnText}
            </button> 
          </div>
        </div>
      </div>
    )}
    
    </>
  );
}