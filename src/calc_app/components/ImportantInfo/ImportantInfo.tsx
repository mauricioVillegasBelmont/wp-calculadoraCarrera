import React from "react";
import {type SectionContentSchema } from "calc_app/data/context/ContentContext";

export interface ImportantInfoProps{
  contents: SectionContentSchema;
}
export default function ImportantInfo(props:ImportantInfoProps){
  const { contents } = props;
  return(
    <div className="component bg-gray-50 p-6 rounded-lg shadow font-sarabun">
      <h2 className="text-head3 text-sushi-500 font-bold text-emerald-800 mb-4">{contents.title}</h2>
        <ul className="text-med space-y-2 list-disc pl-7">
        {
          (contents.list as string[]).length && (contents.list as string[]).map((value,index)=>(
            <li key={index}>{value}</li>
          ))
        }
      </ul>
      <div className="mt-6 p-4 bg-picture text-white rounded flex lg:flex-row flex-col justify-between items-center gap-5">
        <div>
          <h3 className="text-head2 font-bold text-lg">{contents.ctaTitle}</h3>
          {contents.ctaText && (<p className="font-bold">{contents.ctaText}</p>)}
        </div>
        <a href="https://www.itam.mx/contacto" target="_blank" rel="noopener noreferrer"
          className="btn text-white font-bold bg-emerald-800 px-4 py-2 rounded transition print:hidden">{contents.cta}</a>
      </div>
    </div>
  )
}