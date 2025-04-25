import { Navbar } from "../Comunes";
import { usePokemonDetalle } from "../Hooks/HooksPokemonDetalle";
import { useNavigate } from "react-router-dom";
import { Volume2 } from "lucide-react";
import { colores } from "../Comunes";
import PokemonStats from "./PokemonStats";
import PokemonEvoluciones from "./PokemonEvoluciones";

const PokemonDetalle = () => {
  const { pokemon } = usePokemonDetalle();
  const navigate = useNavigate();

  if (!pokemon) {
    return <p className="text-center mt-10 text-white">Cargando Pokémon...</p>;
  }

  const typeBg = colores[pokemon.types[0]] || "bg-gray-200";

  const playCry = () => {
    if (pokemon.cry) {
      const audio = new Audio(pokemon.cry);
      audio.volume = 0.1;
      audio.play();
    }
  };

  const handleEvolutionClick = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className="w-full min-h-screen bg-animated text-white">
      {/* Navbar a ancho completo */}
      <Navbar />

      {/* Contenedor centrado */}
      <div className="flex justify-center pt-8">
        <div className={`relative w-full max-w-3xl p-6 rounded-lg shadow-xl backdrop-blur-md ${typeBg}`}>          
          {/* Row 1: Imagen y audio */}
          <div className="flex items-center justify-center gap-4">
            <img
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain rounded-lg shadow-lg"
              src={pokemon.image}
              alt={pokemon.name}
            />
            {pokemon.cry && (
              <button
                onClick={playCry}
                className="text-white hover:text-gray-200"
                title="Reproducir sonido"
              >
                <Volume2 className="w-8 h-8" />
              </button>
            )}
          </div>

          {/* Row 2: Tipo, Peso, Altura, Ataques */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 p-3 rounded-lg shadow backdrop-blur-sm">
              <strong>Tipo:</strong> {pokemon.types.join(", ")}
            </div>
            <div className="bg-white/10 p-3 rounded-lg shadow backdrop-blur-sm">
              <strong>Peso:</strong> {pokemon.weight} kg
            </div>
            <div className="bg-white/10 p-3 rounded-lg shadow backdrop-blur-sm">
              <strong>Altura:</strong> {pokemon.height} m
            </div>
            <div className="bg-white/10 p-3 rounded-lg shadow backdrop-blur-sm">
              <strong>Ataques:</strong> {pokemon.moves.slice(0, 3).join(", ")}
            </div>
          </div>

          {/* Row 3: Estadísticas Base centradas */}
          <div className="mt-6 flex justify-center">
            <PokemonStats stats={pokemon.stats} />
          </div>

          {/* Row 4: Evoluciones centradas */}
          <div className="mt-6 flex justify-center">
            <PokemonEvoluciones
              evolutions={pokemon.evolution}
              onClick={handleEvolutionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetalle;
