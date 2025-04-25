import { Pokemon } from "./pokemon";

export interface MainContentProps {
  inputBusqueda: string;
  setInputBusqueda: React.Dispatch<React.SetStateAction<string>>;
  tiposSeleccionados: string[];
  setTiposSeleccionados: React.Dispatch<React.SetStateAction<string[]>>;
  pokemons: Pokemon[];
  cargandoMas: boolean;
  finListaRef: React.RefObject<HTMLDivElement | null>;
}
