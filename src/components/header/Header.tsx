import React from 'react';
export default function Header(){
  return(
  <div className="flex items-center justify-between mb-8">
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-emerald-800">Calculadora de Costos</h1>
      <p className="text-xl text-gray-600">Instituto Tecnológico Autónomo de México</p>
    </div>
    <div className="bg-emerald-800 p-4 text-white font-bold text-3xl">ITAM</div>
  </div>
  )
}