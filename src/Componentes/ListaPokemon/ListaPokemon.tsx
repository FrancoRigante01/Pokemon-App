import React from "react";
import Navbar from "../Comunes/Navbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { usePokemons } from "../Hooks/Pokemons/usePokemons";
import { generaciones } from "../Comunes/Generaciones";

/**
 * Componente principal de la Pokédex
 */
const ListaPokemon: React.FC = () => {
  const {
    pokemonsMostrados,
    cargandoMas,
    finListaRef,
    generacion,
    setGeneracion,
    tiposSeleccionados,
    setTiposSeleccionados,
    inputSearch,
    setInputSearch,
  } = usePokemons();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 animate-gradient text-center">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-6 py-10 flex gap-6">
        <Sidebar
          generacionSeleccionada={generacion}
          setGeneracionSeleccionada={setGeneracion}
          generaciones={generaciones}
        />
        <MainContent
          inputBusqueda={inputSearch}
          setInputBusqueda={setInputSearch}
          tiposSeleccionados={tiposSeleccionados}
          setTiposSeleccionados={setTiposSeleccionados}
          pokemons={pokemonsMostrados}
          cargandoMas={cargandoMas}
          finListaRef={finListaRef}
        />
      </div>
    </div>
  );
};

export default ListaPokemon;
