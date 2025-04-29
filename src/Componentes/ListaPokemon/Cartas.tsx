import { Link } from "react-router-dom";
import { CartasProps } from "../../interface";
import { useEquipo } from "../Hooks/Equipo/EquipoContext";
import { useState, useEffect } from "react";

const Cartas = ({ pokemon, colores }: CartasProps) => {
  const typeClass = colores[pokemon.types[0]];
  const isLegendary = pokemon.isLegendary;

  const { equipo, agregarAPequipo, quitarDeEquipo } = useEquipo();
  const yaEstaEnEquipo = equipo.some((p) => p.id === pokemon.id);

  // Imagen por defecto garantizada
  const fallbackURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

  const [imagen, setImagen] = useState(fallbackURL);

  useEffect(() => {
    const cargarSprite = async () => {
      const spriteURLs = [
        pokemon.sprites?.front_default,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
      ];

      for (const url of spriteURLs) {
        if (url) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              setImagen(url);
              return;
            }
          } catch {
            // Si falla, continúa con el próximo URL
          }
        }
      }

      // Si todos los intentos fallan, utiliza la imagen de respaldo
      setImagen(fallbackURL);
    };

    cargarSprite();
  }, [pokemon]);

  const manejarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    yaEstaEnEquipo ? quitarDeEquipo(pokemon.id) : agregarAPequipo(pokemon);
  };

  return (
    <div className="relative">
      <Link to={`/pokemon/${pokemon.id}`} className="block">
        <div
          className={`relative rounded-lg p-4 flex flex-col items-center text-black animate-fade-in ${typeClass} ${
            isLegendary
              ? "legendary-border legendary-background legendary-glow pokemon-card"
              : "shadow-md pokemon-card"
          }`}
          style={{ minHeight: "280px" }}
        >
          <img
            className={`w-24 h-24 object-contain ${isLegendary ? "legendary-sprite" : ""}`}
            src={imagen}
            alt={pokemon.name}
          />

          <h2 className="text-xl font-semibold capitalize mt-2">{pokemon.name}</h2>
          <p><span className="font-bold">Peso:</span> {pokemon.weight}kg</p>
          <p><span className="font-bold">Tipo:</span> {pokemon.types.join(", ")}</p>

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

      <button
        onClick={manejarClick}
        className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-sm font-semibold shadow-md transition-all ${
          yaEstaEnEquipo ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
      >
        {yaEstaEnEquipo ? "Quitar" : "Agregar"}
      </button>
    </div>
  );
};

export default Cartas;