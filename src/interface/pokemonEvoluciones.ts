import { Evolution } from "./evolution";

export interface PokemonEvolucionesProps {
  evolutions: Evolution[];
  onClick: (id: number) => void;
}
