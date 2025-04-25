import FiltroGeneracion from "./FiltroGeneracion";
import Equipo from "./MiEquipo/Equipo";
import { SidebarProps } from "../../interface/SidebarProps"; 

// Componente Sidebar que contiene los filtros de generación y el equipo del usuario.
const Sidebar = ({ generacionSeleccionada, setGeneracionSeleccionada, generaciones }: SidebarProps) => {
  return (
    <div className="w-1/4 -mt-10 bg-yellow-200 p-4 rounded-2xl shadow-lg flex flex-col items-center gap-4 sticky top-0 max-h-[calc(100vh+2.5rem)] overflow-auto">
      {/* Filtro para seleccionar la generación (más pequeño y centrado) */}
      <div className="-mt-2 w-3/4 mx-auto text-center">
        <FiltroGeneracion
          generacionSeleccionada={generacionSeleccionada}
          setGeneracionSeleccionada={setGeneracionSeleccionada}
          generaciones={generaciones}
        />
      </div>

      {/* Componente para mostrar el equipo del usuario */}
      <div className="w-full">
        <Equipo />
      </div>
    </div>
  );
};

export default Sidebar;
