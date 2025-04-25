import React from "react";
import { PropsFiltroGeneracion } from "../../interface/FiltroGeneracion";

const FiltroGeneracion: React.FC<PropsFiltroGeneracion> = ({
  generaciones,
  generacionSeleccionada,
  setGeneracionSeleccionada,
}) => {
  return (
    <aside className="sticky top-4 h-fit max-h-[80vh] overflow-y-auto w-52 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-4 border border-yellow-300">
      <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">Generación</h2>
      <ul className="space-y-2">
        {/* Botón para seleccionar todas las generaciones */}
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              generacionSeleccionada === null
                ? "bg-yellow-300 text-yellow-900 font-semibold"
                : "hover:bg-yellow-100 text-gray-700"
            }`}
            onClick={() => setGeneracionSeleccionada(null)}
          >
            Todas
          </button>
        </li>

        {/* Botones para cada generación */}
        {generaciones.map((gen) => (
          <li key={gen.id}>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                generacionSeleccionada === gen.id
                  ? "bg-yellow-300 text-yellow-900 font-semibold"
                  : "hover:bg-yellow-100 text-gray-700"
              }`}
              onClick={() => setGeneracionSeleccionada(gen.id)}
            >
              {gen.nombre}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FiltroGeneracion;
