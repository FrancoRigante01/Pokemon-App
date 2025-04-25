import { Pokemon } from "../pokemon"; // Asegúrate de que la importación de Pokemon esté correcta

export interface EquipoContextType {
  equipo: Pokemon[];
  agregarAPequipo: (pokemon: Pokemon) => void;
  quitarDeEquipo: (id: number) => void;
  setEquipoInicial: (equipoInicial: Pokemon[]) => void;
  setEquipoCompleto: (nuevoEquipo: Pokemon[]) => void;
  loading: boolean;  // Asegúrate de incluir esta propiedad en el tipo
}
