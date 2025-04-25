import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../../interface/pokemon";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

// Hook personalizado para obtener los detalles de un Pokémon específico desde Firestore
export const usePokemonDetalle = () => {
  // Obtener el parámetro `id` desde la URL
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!id) return;

      try {
        // Referencia al documento del Pokémon en Firestore
        const docRef = doc(db, "pokemons", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Convertir el objeto de estadísticas en un array con nombre y valor
          const statsArray = data.stats
            ? Object.entries(data.stats).map(([name, value]) => ({
                name,
                value: Number(value),
              }))
            : [];

          // Estructurar los datos del Pokémon asegurando valores por defecto si faltan campos
          const pokemonData: Pokemon = {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            image:
              data.sprites?.other?.["official-artwork"]?.front_default ??
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
            types: data.types || [],
            weight: data.weight || 0,
            height: data.height || 0,
            moves: data.moves || [],
            stats: statsArray,
            cry: data.cry || "",
            evolution: data.evolution || [],
            isLegendary: data.isLegendary || false,
          };

          // Guardar los datos en el estado local
          setPokemon(pokemonData);
        } else {
          console.log("No se encontró el Pokémon con ID:", id);
        }
      } catch (error) {
        console.error("Error al obtener datos del Pokémon desde Firestore:", error);
      }
    };

    fetchPokemon();
  }, [id]);

  // Devolver el Pokémon encontrado (o null si aún no cargó)
  return { pokemon };
};
