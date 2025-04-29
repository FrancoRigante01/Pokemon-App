import { Pokemon } from "../../interface/pokemon";
import Fuse from "fuse.js";

export const filtrarPokemons = (
  pokemons: Pokemon[],
  tiposSeleccionados: string[],
  generacionSeleccionada: number | null,
  searchQuery: string,
  fuse: Fuse<Pokemon>
): Pokemon[] => {
  // Copia inicial de la lista de Pokémon
  let filtrados = [...pokemons];

  // Filtrar por tipos seleccionados (todos deben coincidir - lógica AND)
  if (tiposSeleccionados.length > 0) {
    filtrados = filtrados.filter((pokemon) =>
      tiposSeleccionados.every((tipo) => pokemon.types.includes(tipo))
    );
  }

  // Filtrar por generación si se seleccionó alguna
  if (generacionSeleccionada) {
    const generacionRangos: Record<number, [number, number]> = {
      1: [1, 151],
      2: [152, 251],
      3: [252, 386],
      4: [387, 493],
      5: [494, 649],
      6: [650, 721],
      7: [722, 809],
      8: [810, 905],
      9: [906, 1010],
    };

    const [inicio, fin] = generacionRangos[generacionSeleccionada];

    // Filtra Pokémon cuyo ID esté dentro del rango de la generación
    filtrados = filtrados.filter((pokemon) => pokemon.id >= inicio && pokemon.id <= fin);
  }

  // Filtrar por búsqueda difusa si hay un término ingresado
  if (searchQuery.trim() !== "") {
    const resultados = fuse.search(searchQuery); // Resultados de Fuse.js
    const nombresCoincidentes = new Set(resultados.map((res) => res.item.name));

    // Filtra los Pokémon cuyos nombres coincidan con los resultados de Fuse
    filtrados = filtrados.filter((pokemon) => nombresCoincidentes.has(pokemon.name));
  }

  // Devuelve la lista final de Pokémon filtrados
  return filtrados;
};
