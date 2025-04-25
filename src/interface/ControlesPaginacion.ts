export interface ControlesPaginacionProps {
    paginaActual: number;
    totalPaginas: number;
    nextPage: () => void;
    prevPage: () => void;
  }
  