import { useState, useMemo, useRef } from "react";
import Fuse from "fuse.js";
import { useDebounce } from "./useDebounce";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { useFirestorePokemons } from "./useFirestorePokemons";

export const usePokemons = () => {
  // UI filters
  const [generacion, setGeneracion] = useState<number | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);

  // Search input
  const [inputSearch, setInputSearch] = useState("");
  const searchQuery = useDebounce(inputSearch);

  // Fetch data from Firestore
  const {
    pokemons,
    loading,
    moreLoading: cargandoMas,
    hasMore,
    fetchMore,
  } = useFirestorePokemons(generacion, tipo, searchQuery);

  // Infinite scroll reference (useRef<HTMLDivElement>(null) -> RefObject<HTMLDivElement>)
  const finListaRef = useRef<HTMLDivElement>(null);
  useInfiniteScroll(finListaRef, fetchMore, hasMore && !searchQuery);

  // In-memory filtering + fuzzy search with Fuse
  const fuse = useMemo(() => new Fuse(pokemons, { keys: ["name"], threshold: 0.3 }), [pokemons]);
  const pokemonsMostrados = useMemo(() => {
    let lista = [...pokemons];
    if (searchQuery) {
      const prefix = lista.filter(p => p.name.toLowerCase().startsWith(searchQuery));
      return prefix.length ? prefix : fuse.search(searchQuery).map(r => r.item);
    }
    return lista;
  }, [pokemons, searchQuery, fuse]);

  return {
    pokemonsMostrados,
    loading,
    cargandoMas,
    hasMore,
    finListaRef,
    generacion,
    setGeneracion,
    tipo,
    setTipo,
    inputSearch,
    setInputSearch,
  };
};