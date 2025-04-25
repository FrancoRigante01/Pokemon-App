import { Pokemon } from "./pokemon";

export interface CartasProps {
    pokemon: Pokemon;
    colores: { [key: string]: string };
    agregarPokemon?: (id: number) => void;
}
