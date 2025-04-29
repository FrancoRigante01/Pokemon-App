import React, { useCallback, useMemo } from "react";
import { EquipoContext } from "./EquipoContext";
import { useEquipoFirestore } from "./useEquipoFirestore";
import { Pokemon } from "../../../interface/pokemon";
import Loader from "../../Comunes/Loader";

/**
 * Proveedor de contexto de Equipo Pokémon
 */
export const EquipoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { equipo, setEquipo, loading } = useEquipoFirestore();

  // Establece un equipo completo (reemplaza todos los miembros)
  const setEquipoCompleto = useCallback(
    (nuevoEquipo: Pokemon[]) => setEquipo(nuevoEquipo),
    [setEquipo]
  );

  // Establece un equipo inicial (idéntico a setEquipoCompleto)
  const setEquipoInicial = useCallback(
    (equipoInicial: Pokemon[]) => setEquipo(equipoInicial),
    [setEquipo]
  );

  // Agrega un Pokémon si no está y hay espacio
  const agregarAPequipo = useCallback(
    (pokemon: Pokemon) => {
      setEquipo(prev =>
        prev.length >= 6 || prev.some(p => p.id === pokemon.id)
          ? prev
          : [...prev, pokemon]
      );
    },
    [setEquipo]
  );

  // Quita un Pokémon por su ID
  const quitarDeEquipo = useCallback(
    (id: number) => setEquipo(prev => prev.filter(p => p.id !== id)),
    [setEquipo]
  );

  // Memoizar value para evitar re-renderes innecesarios
  const contextValue = useMemo(
    () => ({
      equipo,
      agregarAPequipo,
      quitarDeEquipo,
      setEquipoInicial,
      setEquipoCompleto,
      loading,
    }),
    [equipo, agregarAPequipo, quitarDeEquipo, setEquipoInicial, setEquipoCompleto, loading]
  );

  // Mostrar loader mientras se sincroniza con Firestore
  if (loading) {
    return <Loader />;
  }

  return (
    <EquipoContext.Provider value={contextValue}>
      {children}
    </EquipoContext.Provider>
  );
};
