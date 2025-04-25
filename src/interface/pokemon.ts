import { Stat } from "./stats";
import { Evolution } from "./evolution";

export interface Sprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default?: string | null;
      front_shiny?: string | null;
    };
    home?: {
      front_default?: string | null;
      front_shiny?: string | null;
    };
    dream_world?: {
      front_default?: string | null;
    };
  };
}

export interface Pokemon {
  isLegendary: boolean;
  cry: any;
  id: number;
  name: string;
  image?: string; 
  types: string[];
  weight: number;
  height: number;
  moves: string[];
  stats: Stat[];
  evolution: Evolution[];
  sprites: Sprites;
  generacion: number;
}
