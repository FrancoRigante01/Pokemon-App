import { useState, useMemo, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { useFirestorePokemons } from "./useFirestorePokemons";

export const usePokemons = () => {
  // Filtros de UI
  const [generacion, setGeneracion] = useState<number | null>(null);
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]);

  // Búsqueda simple con debounce
  const [inputSearch, setInputSearch] = useState("");
  const searchQuery = useDebounce(inputSearch);

  // Obtención de datos desde Firestore filtrando por generación, tipos y búsqueda
  // (useFirestorePokemons ya recarga cuando cambian esos valores)
  const {
    pokemons,
    loading,
    moreLoading: cargandoMas,
    hasMore,
    fetchMore,
  } = useFirestorePokemons(generacion, tiposSeleccionados, searchQuery);

  // Referencia para infinite scroll
  const finListaRef = useRef<HTMLDivElement>(null);
  useInfiniteScroll(finListaRef, fetchMore, hasMore);

  // Aplicar búsqueda normal (includes)
  const pokemonsMostrados = useMemo(() => {
    let lista = [...pokemons];

    if (searchQuery) {
      lista = lista.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return lista;
  }, [pokemons, searchQuery]);

  return {
    pokemonsMostrados,
    loading,
    cargandoMas,
    hasMore,
    finListaRef,
    generacion,
    setGeneracion,
    tiposSeleccionados,
    setTiposSeleccionados,
    inputSearch,
    setInputSearch,
  };
};
