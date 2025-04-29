import { useState, useCallback, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  startAt,
  endAt,
  limit,
  Query,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Pokemon } from "../../../interface/pokemon";
import { FirestoreResult } from "../../../interface/hooks/FirestoreResult";

const PAGE_LIMIT = 12;

/**
 * Hook para paginación, búsqueda y filtrado de Pokémon en Firestore.
 * Soporta:
 * - Paginación por 'id' cuando no hay búsqueda
 * - Búsqueda por nombre (prefijo) con startAt/endAt
 * - Filtrado por generación y tipos seleccionados en la misma query
 */
export const useFirestorePokemons = (
  generacion: number | null,
  tiposSeleccionados: string[],
  searchQuery: string
): FirestoreResult => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [lastCursor, setLastCursor] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  // Construye la query con filtros de generación, tipos, y opcional búsqueda por nombre
  const buildQuery = useCallback(
    (base: Query<DocumentData>) => {
      let q = base;
      if (generacion !== null) {
        q = query(q, where("generacion", "==", generacion));
      }
      if (tiposSeleccionados.length > 0) {
        q = query(
          q,
          where("types", "array-contains-any", tiposSeleccionados)
        );
      }
      return q;
    },
    [generacion, tiposSeleccionados]
  );

  // Función para obtener la primera página o resultados de búsqueda
  const fetchInitial = useCallback(async () => {
    setLoading(true);
    setPokemons([]);
    setLastCursor(null);
    const baseRef = collection(db, "pokemons");

    let q: Query<DocumentData>;
    if (searchQuery) {
      // Búsqueda por prefijo de nombre
      q = query(
        baseRef,
        orderBy("name"),
        startAt(searchQuery.toLowerCase()),
        endAt(searchQuery.toLowerCase() + "\uf8ff"),
        limit(PAGE_LIMIT)
      );
    } else {
      // Paginación normal por ID con filtros
      q = query(
        baseRef,
        orderBy("id"),
        limit(PAGE_LIMIT)
      );
      q = buildQuery(q);
    }

    try {
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ ...(d.data() as Pokemon), id: parseInt(d.id) }));
      setPokemons(data);
      // Cursor para paginación: usa último doc
      setLastCursor(snap.docs[snap.docs.length - 1] || null);
      setHasMore(data.length === PAGE_LIMIT);
    } catch (err) {
      console.error("Error en carga inicial:", err);
    } finally {
      setLoading(false);
    }
  }, [buildQuery, searchQuery]);

  // Función para cargar más páginas (solo cuando no hay búsqueda)
  const fetchMore = useCallback(async () => {
    if (moreLoading || !hasMore || !lastCursor || searchQuery) return;
    setMoreLoading(true);
    const baseRef = collection(db, "pokemons");

    let q: Query<DocumentData> = query(
      baseRef,
      orderBy("id"),
      startAfter(lastCursor),
      limit(PAGE_LIMIT)
    );
    q = buildQuery(q);

    try {
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ ...(d.data() as Pokemon), id: parseInt(d.id) }));
      setPokemons((prev) => [...prev, ...data]);
      setLastCursor(snap.docs[snap.docs.length - 1] || lastCursor);
      setHasMore(data.length === PAGE_LIMIT);
    } catch (err) {
      console.error("Error paginación:", err);
    } finally {
      setMoreLoading(false);
    }
  }, [buildQuery, hasMore, lastCursor, moreLoading, searchQuery]);

  // Efecto para carga inicial y recarga cuando cambian filtros o búsqueda
  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return { pokemons, loading, moreLoading, hasMore, fetchInitial, fetchMore };
};
