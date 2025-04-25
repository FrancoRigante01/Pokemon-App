export interface SidebarProps {
    generacionSeleccionada: number | null;
    setGeneracionSeleccionada: (generacion: number | null) => void;
    generaciones: { id: number; nombre: string;}[];
  }
  