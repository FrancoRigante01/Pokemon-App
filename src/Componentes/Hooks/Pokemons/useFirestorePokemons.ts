import { useState, useCallback, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  Query,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Pokemon } from "../../../interface/pokemon";
import { FirestoreResult } from "../../../interface/hooks/FirestoreResult";

const PAGE_LIMIT = 12;

export const useFirestorePokemons = (
  generacion: number | null,
  tipo: string | null,
  searchQuery: string
): FirestoreResult => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const buildQuery = useCallback(
    (base: Query<DocumentData>) => {
      let q = base;
      if (generacion !== null) q = query(q, where("generacion", "==", generacion));
      if (tipo) q = query(q, where("types", "array-contains", tipo));
      return q;
    },
    [generacion, tipo]
  );

  const fetchInitial = useCallback(async () => {
    if (searchQuery) return;
    setLoading(true);
    const baseRef = collection(db, "pokemons");
    let q: Query<DocumentData> = query(baseRef, orderBy("id"), limit(PAGE_LIMIT));
    q = buildQuery(q);
    try {
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ ...(d.data() as Pokemon), id: parseInt(d.id) }));
      setPokemons(data);
      setLastId(data.at(-1)?.id || null);
      setHasMore(data.length === PAGE_LIMIT);
    } catch (err) {
      console.error("Error en carga inicial:", err);
    } finally {
      setLoading(false);
    }
  }, [buildQuery, searchQuery]);

  const fetchMore = useCallback(async () => {
    if (moreLoading || !hasMore || !lastId || searchQuery) return;
    setMoreLoading(true);
    const baseRef = collection(db, "pokemons");
    let q: Query<DocumentData> = query(
      baseRef,
      orderBy("id"),
      startAfter(lastId),
      limit(PAGE_LIMIT)
    );
    q = buildQuery(q);
    try {
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ ...(d.data() as Pokemon), id: parseInt(d.id) }));
      setPokemons(prev => [...prev, ...data]);
      setLastId(data.at(-1)?.id || lastId);
      setHasMore(data.length === PAGE_LIMIT);
    } catch (err) {
      console.error("Error paginación:", err);
    } finally {
      setMoreLoading(false);
    }
  }, [buildQuery, hasMore, lastId, moreLoading, searchQuery]);

  useEffect(() => {
    if (searchQuery) return;
    fetchInitial();
  }, [fetchInitial, searchQuery]);

  return { pokemons, loading, moreLoading, hasMore, fetchInitial, fetchMore };
};