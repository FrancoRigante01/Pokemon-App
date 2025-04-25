import { FC } from "react";
import { MainContentProps } from "../../interface/MainContent";
import BarraBusqueda from "./BarraBusqueda";
import FiltroTipos from "./FiltroTipos";
import Cartas from "./Cartas";
import Loader from "./Loader";
import colores from "../Comunes/Colores";

const MainContent: FC<MainContentProps> = ({
  inputBusqueda,
  setInputBusqueda,
  tiposSeleccionados,
  setTiposSeleccionados,
  pokemons,
  cargandoMas,
  finListaRef,
}) => (
  <div className="w-3/4 flex flex-col items-center gap-4">
    <BarraBusqueda inputBusqueda={inputBusqueda} setInputBusqueda={setInputBusqueda} />
    <FiltroTipos tiposSeleccionados={tiposSeleccionados} setTiposSeleccionados={setTiposSeleccionados} />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pokemons.map(p => (
        <Cartas key={p.id} pokemon={p} colores={colores} />
      ))}
    </div>
    <div ref={finListaRef} className="h-10" />
    {cargandoMas && <Loader />}
  </div>
);

export default MainContent;

