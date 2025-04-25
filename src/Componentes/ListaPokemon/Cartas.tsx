import { Link } from "react-router-dom";
import { CartasProps } from "../../interface";
import { useEquipo } from "../Hooks/HooksEquipo";

const Cartas = ({ pokemon, colores }: CartasProps) => {
  // Obtener el color del tipo de Pokémon basado en el primer tipo
  const typeClass = colores[pokemon.types[0]];
  
  // Determinar si el Pokémon es legendario
  const isLegendary = pokemon.isLegendary;
  
  // Definir la imagen que se mostrará (si no tiene imagen, usar una imagen por defecto)
  const imagen = pokemon.sprites?.front_default ?? "https://via.placeholder.com/96";

  // Obtener el estado del equipo (pokémons seleccionados) y las funciones para agregar/quitar pokémons
  const { equipo, agregarAPequipo, quitarDeEquipo } = useEquipo();

  // Verificar si el Pokémon ya está en el equipo
  const yaEstaEnEquipo = equipo.some((p) => p.id === pokemon.id);

  // Función para manejar el clic en el botón (agregar o quitar Pokémon del equipo)
  const manejarClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir la acción predeterminada
    if (yaEstaEnEquipo) {
      quitarDeEquipo(pokemon.id); // Si ya está en el equipo, lo quitamos
    } else {
      agregarAPequipo(pokemon); // Si no está, lo agregamos al equipo
    }
  };

  return (
    <div className="relative">
      {/* Enlace que lleva a la página de detalle del Pokémon */}
      <Link to={`/pokemon/${pokemon.id}`} className="block">
        <div
          className={`relative rounded-lg p-4 flex flex-col items-center text-black animate-fade-in ${typeClass} ${
            isLegendary
              ? "legendary-border legendary-background legendary-glow pokemon-card"
              : "shadow-md pokemon-card"
          }`}
          style={{ minHeight: "280px" }}
        >
          {/* Imagen del Pokémon */}
          <img
            className={`w-24 h-24 object-contain ${isLegendary ? "legendary-sprite" : ""}`}
            src={imagen}
            alt={pokemon.name}
          />

          {/* Nombre del Pokémon */}
          <h2 className="text-xl font-semibold capitalize mt-2">{pokemon.name}</h2>
          
          {/* Información adicional sobre el Pokémon */}
          <p>
            <span className="font-bold">Peso:</span> {pokemon.weight}kg
          </p>
          <p>
            <span className="font-bold">Tipo:</span> {pokemon.types.join(", ")}
          </p>

          {/* Muestra los ataques del Pokémon (si existen) */}
          <div className="w-full max-h-14 overflow-auto text-center mt-1">
            <span className="font-bold">Ataques:</span>{" "}
            {pokemon.moves?.map((move, index) => (
              <span key={index}>
                {move}
                {index < pokemon.moves.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Botón para agregar o quitar el Pokémon del equipo */}
      <button
        onClick={manejarClick} // Llamada a la función al hacer clic
        className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-sm font-semibold shadow-md transition-all ${
          yaEstaEnEquipo ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
      >
        {yaEstaEnEquipo ? "Quitar" : "Agregar"} {/* Cambia el texto según si está en el equipo */}
      </button>
    </div>
  );
};

export default Cartas;
