import { useEquipo } from "../Hooks/Equipo/EquipoContext";

const fallbackURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

export default function MiEquipo() {
  const { equipo, quitarDeEquipo } = useEquipo();

  return (
    <div className="p-4 bg-gray-800 text-white rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-bold mb-2">Mi Equipo</h2>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => {
          const pokemon = equipo[i];
          return (
            <div
              key={i}
              className="bg-gray-700 rounded-xl p-2 flex items-center justify-center h-16"
            >
              {pokemon ? (
                <div className="cursor-pointer hover:text-red-400" onClick={() => quitarDeEquipo(pokemon.id)}>
                  <img
                    src={pokemon.sprites?.front_default || fallbackURL}
                    alt={`Pokémon ${pokemon.id}`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              ) : (
                <span className="text-gray-500">Vacío</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
