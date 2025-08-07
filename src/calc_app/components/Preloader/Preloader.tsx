import React from 'react';
import preloader from '../../assets/img/preloader.svg';


export default function Preloader(){
  return(
  <>
  <div className="w-full font-sarabun text-base">
    <div className="flex flex-col px-4 lg:px-6 py-6 bg-white text-gray-800 max-w-5xl mx-auto text-center">
      <img src={preloader} alt="Loading" width='50' className='block mx-auto'/>
      <p className='mx-auto'>Cargando...</p>
    </div>
  </div>
  </>
  )
}