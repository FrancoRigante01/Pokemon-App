const ContadorPokemons = ({ cantidad, total }: { cantidad: number; total: number | null }) => {
    return (
      <p className="mt-4 text-gray-600">
        Mostrando {cantidad} de {total || "..."}
      </p>
    );
  };
  
  export default ContadorPokemons;
  