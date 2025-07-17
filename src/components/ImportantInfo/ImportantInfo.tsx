import React from "react";

 
export default function ImportantInfo(){
  return(
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-emerald-800 mb-4">Información Importante</h2>
      <div className="text-sm text-gray-600 space-y-3">
        <p>• Los costos mostrados son aproximados y están sujetos a cambios.</p>
        <p>• La Cuota Única de Primer Ingreso ($21,000) solo se paga una vez al inicio de la carrera.</p>
        <p>• El costo actual por crédito es de $4,020 (2025).</p>
        <p>• Para obtener información específica sobre requisitos de becas, contacta a la oficina de ayuda
          financiera.</p>
        <p>• Las becas están sujetas a mantenimiento de promedio y otros requisitos académicos.</p>
      </div>
      <div className="mt-6 p-4 bg-emerald-800 text-white rounded flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">¿Necesitas más información?</h3>
          <p>Contáctanos para resolver todas tus dudas.</p>
        </div><a href="https://www.itam.mx/contacto" target="_blank" rel="noopener noreferrer"
          className="bg-white text-emerald-800 px-4 py-2 rounded font-medium hover:bg-gray-100 transition">Contacto</a>
      </div>
    </div>
  )
}