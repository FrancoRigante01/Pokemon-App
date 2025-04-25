// HooksEquipo.tsx
import React from "react";
import { EquipoContext } from "./EquipoContext";
import { useEquipoFirestore } from "./useEquipoFirestore";
import { Pokemon } from "../../../interface/pokemon";

export const HooksEquipo = ({ children }: { children: React.ReactNode }) => {
  const { equipo, setEquipo, loading } = useEquipoFirestore();

  const setEquipoCompleto = (nuevoEquipo: Pokemon[]) => setEquipo(nuevoEquipo);

  const setEquipoInicial = (equipoInicial: Pokemon[]) => setEquipo(equipoInicial);

  const agregarAPequipo = (pokemon: Pokemon) => {
    setEquipo((prev) => {
      if (prev.length >= 6 || prev.some((p) => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const quitarDeEquipo = (id: number) => setEquipo((prev) => prev.filter((p) => p.id !== id));

  return (
    <EquipoContext.Provider
      value={{
        equipo,
        agregarAPequipo,
        quitarDeEquipo,
        setEquipoInicial,
        setEquipoCompleto,
        loading,
      }}
    >
      {children}
    </EquipoContext.Provider>
  );
};
