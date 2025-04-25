import { FC } from "react";
import { PokemonEvolucionesProps } from "../../interface/pokemonEvoluciones"; 

// Componente que recibe evoluciones y una función onClick como props
const PokemonEvoluciones: FC<PokemonEvolucionesProps> = ({ evolutions, onClick }) => {
  return (
    <div className="w-full mt-6">
      {/* Título de la sección */}
      <h2 className="text-xl font-semibold mb-4 text-center">Evoluciones</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {/* Mapeo de las evoluciones */}
        {evolutions.map((evo, index) => (
          <div
            key={index} // La key es  para optimizar el renderizado en listas
            className="bg-white/10 p-4 rounded-lg shadow text-center w-36 backdrop-blur-sm cursor-pointer"
            onClick={() => onClick(evo.id)} // Llamada a la función onClick con el ID de la evolución
          >
            {/* Imagen de la evolución */}
            <img
              src={evo.image} // Imagen de la evolución
              alt={evo.name} // Texto alternativo con el nombre de la evolución
              className="w-20 h-20 mx-auto object-contain mb-2" // Estilos para la imagen
            />
            {/* Nombre de la evolución */}
            <p className="capitalize font-medium text-white">{evo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonEvoluciones;
