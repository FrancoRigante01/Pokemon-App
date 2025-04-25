// EquipoContext.tsx
import { createContext, useContext } from "react";
import { EquipoContextType } from "../../../interface/hooks/Equipo";

export const EquipoContext = createContext<EquipoContextType | undefined>(undefined);

export const useEquipo = (): EquipoContextType => {
  const context = useContext(EquipoContext);
  if (!context) {
    throw new Error("useEquipo debe usarse dentro de un <HooksEquipo>");
  }
  return context;
};
