import { Generacion } from "./Generacion";

export interface PropsFiltroGeneracion {
  generaciones: Generacion[];
  generacionSeleccionada: number | null;
  setGeneracionSeleccionada: (g: number | null) => void;
}
