import Navbar from "../Comunes/Navbar"; 
import Sidebar from "./Sidebar"; 
import MainContent from "./MainContent"; 
import { usePokemons } from "../Hooks/HooksPokemons"; 
import { generaciones } from "../Comunes/Generaciones"; 

// Componente principal de la Pokédex
const ListaPokemon = () => {
  // Extraccion de estados y funciones del hook
  const {
    pokemonsMostrados, // Pokémon que se deben mostrar según los filtros
    inputBusqueda, setInputBusqueda, // Estado y función para manejar el input de búsqueda
    tiposSeleccionados, setTiposSeleccionados, // Filtros por tipo
    generacionSeleccionada, setGeneracionSeleccionada, // Filtros por generación
    cargandoMas, // Estado que indica si se están cargando más
    finListaRef, // Referencia al elemento al final de la lista
  } = usePokemons();

  // Renderizado del componente
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 animate-gradient text-center">
      {/* Navbar superior */}
      <Navbar />

      {/* Contenedor principal con diseño */}
      <div className="w-full max-w-7xl mx-auto px-6 py-10 flex gap-6">
        
        {/* Sidebar con filtro de generaciones */}
        <Sidebar
          generacionSeleccionada={generacionSeleccionada}
          setGeneracionSeleccionada={setGeneracionSeleccionada}
          generaciones={generaciones}
        />

        {/* Contenido principal: búsqueda, tipos y lista de Pokémon */}
        <MainContent
          inputBusqueda={inputBusqueda}
          setInputBusqueda={setInputBusqueda}
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
