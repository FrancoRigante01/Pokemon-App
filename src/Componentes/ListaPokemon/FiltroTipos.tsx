import { FC } from "react";
import { FiltroTiposProps } from "../../interface/FiltroTipos";


// Diccionario con íconos y colores de fondo por tipo de Pokémon
const tiposConIconos: { [key: string]: { icono: string; color: string } } = {
  normal: { icono: "⚪", color: "bg-yellow-600" },
  fire: { icono: "🔥", color: "bg-red-600" },
  water: { icono: "💧", color: "bg-blue-400" },
  grass: { icono: "🌿", color: "bg-green-600" },
  electric: { icono: "⚡", color: "bg-yellow-300" },
  ice: { icono: "❄️", color: "bg-blue-200" },
  fighting: { icono: "🥊", color: "bg-red-900" },
  poison: { icono: "☠️", color: "bg-purple-800" },
  ground: { icono: "🌍", color: "bg-yellow-700" },
  flying: { icono: "🕊️", color: "bg-yellow-200" },
  psychic: { icono: "🔮", color: "bg-pink-600" },
  bug: { icono: "🐛", color: "bg-green-300" },
  rock: { icono: "🗿", color: "bg-yellow-900" },
  ghost: { icono: "👻", color: "bg-purple-300" },
  dark: { icono: "🌑", color: "bg-gray-700" },
  dragon: { icono: "🐉", color: "bg-red-800" },
  steel: { icono: "⚙️", color: "bg-gray-400" },
  fairy: { icono: "✨", color: "bg-pink-400" },
};

// Componente de filtro por tipo de Pokémon
const FiltroTipos: FC<FiltroTiposProps> = ({ tiposSeleccionados, setTiposSeleccionados }) => {
  // Alterna la selección de un tipo: si ya está seleccionado, lo quita; si no, lo agrega
  const toggleTipo = (tipo: string) => {
    setTiposSeleccionados((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  // Limpia todos los filtros de tipo
  const limpiarFiltros = () => setTiposSeleccionados([]);

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {/* Botón para limpiar selección de tipos */}
      <button
        onClick={limpiarFiltros}
        className={`px-3 py-1 rounded-full border ${
          tiposSeleccionados.length === 0 ? "bg-black text-white" : "bg-white"
        }`}
      >
        Todos
      </button>

      {/* Botones para cada tipo de Pokémon */}
      {Object.entries(tiposConIconos).map(([tipo, { icono, color }]) => (
        <button
          key={tipo}
          onClick={() => toggleTipo(tipo)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-white shadow-md text-sm ${color} ${
            tiposSeleccionados.includes(tipo) ? "ring-2 ring-black scale-105" : ""
          }`}
        >
          <span>{icono}</span>
          <span className="capitalize">{tipo}</span>
        </button>
      ))}
    </div>
  );
};

export default FiltroTipos;
