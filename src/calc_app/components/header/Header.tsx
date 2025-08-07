import React from 'react';
import {type SectionContentSchema } from 'calc_app/data/context/ContentContext';

interface HeaderComponentProps {
  contents: SectionContentSchema;
}
export default function Header(props:HeaderComponentProps){
  const {contents}=props
  return(
  <div className="component flex items-center justify-between mb-8 font-sarabun">
    <div className="flex flex-col">
      <h2 className="text-head1 text-sushi-500 font-medium font-sarabun ">{contents.title}</h2>
    </div>
  </div>
  )
}