import { useEffect, useMemo, useRef, useState } from "react";
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
import Fuse from "fuse.js"; 
import { db } from "../../firebase"; 
import { Pokemon } from "../../interface/pokemon"; 

const LIMITE_POR_PAGINA = 12; // Límite de resultados por página

export const usePokemons = () => {
  //Estados para los datos y control de carga
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Lista actual de pokemons
  const [loading, setLoading] = useState(true); // Estado de carga
  const [cargandoMas, setCargandoMas] = useState(false); // Si se está cargando más pokemons (scroll infinito)
  const [ultimoId, setUltimoId] = useState<number | null>(null); // Usado para paginación
  const [hasMore, setHasMore] = useState(true); // Si hay más datos por cargar

  //Filtros
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState<number | null>(null);
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]); // Filtro por tipo

  //Búsqueda
  const [inputBusqueda, setInputBusqueda] = useState(""); // Entrada del usuario
  const [searchQuery, setSearchQuery] = useState(""); // Query confirmado con debounce

  //Ref para detectar cuando se llega al final de la lista
  const finListaRef = useRef<HTMLDivElement>(null);

  //Debounce para la búsqueda (para no disparar múltiples consultas)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(inputBusqueda.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputBusqueda]);

  //Configuración de Fuse para búsqueda en memoria
  const fuse = useMemo(
    () => new Fuse(pokemons, { keys: ["name"], threshold: 0.3 }),
    [pokemons]
  );

  //Búsqueda en Firestore
  useEffect(() => {
    if (searchQuery === "") return;

    const buscarPorNombre = async () => {
      setLoading(true);
      try {
        const baseRef = collection(db, "pokemons");
        // Búsqueda por nombre usando rangos
        let q: Query<DocumentData> = query(
          baseRef,
          orderBy("name"),
          startAt(searchQuery),
          endAt(searchQuery + "\uf8ff")
        );
        // Filtros adicionales si se seleccionaron
        if (generacionSeleccionada !== null) {
          q = query(q, where("generacion", "==", generacionSeleccionada));
        }
        if (tiposSeleccionados.length > 0) {
          q = query(q, where("types", "array-contains", tiposSeleccionados[0]));
        }
        const snap = await getDocs(q);
        const resultados = snap.docs.map(d => ({ ...(d.data() as Pokemon), id: parseInt(d.id) }));
        setPokemons(resultados);
        setHasMore(false); // Se desactiva scroll si hay búsqueda
      } catch (err) {
        console.error("Error búsqueda prefix:", err);
      } finally {
        setLoading(false);
      }
    };

    buscarPorNombre();
  }, [searchQuery, generacionSeleccionada, tiposSeleccionados]);

  //Carga inicial en modo exploración (sin búsqueda)
  useEffect(() => {
    if (searchQuery !== "") return;

    const cargarInicial = async () => {
      setLoading(true);
      try {
        const baseRef = collection(db, "pokemons");
        // Query por ID con paginación
        let q: Query<DocumentData> = query(baseRef, orderBy("id"), limit(LIMITE_POR_PAGINA));
        if (generacionSeleccionada !== null) {
          q = query(q, where("generacion", "==", generacionSeleccionada));
        }
        if (tiposSeleccionados.length > 0) {
          q = query(q, where("types", "array-contains", tiposSeleccionados[0]));
        }
        const snap = await getDocs(q);
        const iniciales = snap.docs.map(d => ({ ...(d.data() as Pokemon), id: parseInt(d.id) }));
        setPokemons(iniciales);
        setUltimoId(iniciales.at(-1)?.id || null);
        setHasMore(iniciales.length === LIMITE_POR_PAGINA); // Si se recibieron todos, hay más
      } catch (err) {
        console.error("Error carga inicial:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarInicial();
  }, [generacionSeleccionada, tiposSeleccionados, searchQuery]);

  //Carga de más pokemons con scroll infinito
  const cargarMasPokemons = async () => {
    if (cargandoMas || !hasMore || ultimoId === null || searchQuery !== "") return;
    setCargandoMas(true);
    try {
      const baseRef = collection(db, "pokemons");
      let q: Query<DocumentData> = query(
        baseRef,
        orderBy("id"),
        startAfter(ultimoId), // Cargar después del último
        limit(LIMITE_POR_PAGINA)
      );
      if (generacionSeleccionada !== null) {
        q = query(q, where("generacion", "==", generacionSeleccionada));
      }
      if (tiposSeleccionados.length > 0) {
        q = query(q, where("types", "array-contains", tiposSeleccionados[0]));
      }
      const snap = await getDocs(q);
      const nuevos = snap.docs.map(d => ({ ...(d.data() as Pokemon), id: parseInt(d.id) }));
      // Evitar duplicados con Map
      setPokemons(prev => {
        const combinado = [...prev, ...nuevos];
        return Array.from(new Map(combinado.map(p => [p.id, p])).values());
      });
      setUltimoId(nuevos.at(-1)?.id || ultimoId);
      setHasMore(nuevos.length === LIMITE_POR_PAGINA);
    } catch (err) {
      console.error("Error paginación:", err);
    } finally {
      setCargandoMas(false);
    }
  };

  // Observador para scroll infinito
  useEffect(() => {
    if (searchQuery !== "" || !finListaRef.current) return;
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) cargarMasPokemons(); },
      { threshold: 1.0 } // Solo cuando el div está completamente visible
    );
    obs.observe(finListaRef.current);
    return () => { if (finListaRef.current) obs.unobserve(finListaRef.current); };
  }, [finListaRef, cargarMasPokemons, searchQuery]);

  //Filtrado en memoria final: tipos AND + búsqueda difusa
  const pokemonsMostrados = useMemo(() => {
    let lista = [...pokemons];
    // Filtro por tipos usando lógica AND
    if (tiposSeleccionados.length > 0) {
      lista = lista.filter(p => tiposSeleccionados.every(t => p.types.includes(t)));
    }
    // Si hay búsqueda: intento de prefijo primero, si no hay resultados se usa Fuse
    if (searchQuery !== "") {
      const prefijo = lista.filter(p => p.name.toLowerCase().startsWith(searchQuery));
      return prefijo.length > 0 ? prefijo : fuse.search(searchQuery).map(r => r.item);
    }
    return lista;
  }, [pokemons, tiposSeleccionados, searchQuery, fuse]);

  return {
    pokemonsMostrados,
    loading,
    cargandoMas,
    hasMore,
    generacionSeleccionada,
    setGeneracionSeleccionada,
    tiposSeleccionados,
    setTiposSeleccionados,
    inputBusqueda,
    setInputBusqueda,
    finListaRef,
    cargarMasPokemons,
  };
};
