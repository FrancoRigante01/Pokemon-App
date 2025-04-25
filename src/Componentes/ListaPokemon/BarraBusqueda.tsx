import React, { FC, useState, useEffect } from "react";

export interface BarraBusquedaProps {
  inputBusqueda: string;
  setInputBusqueda: React.Dispatch<React.SetStateAction<string>>;
}

const BarraBusqueda: FC<BarraBusquedaProps> = ({ inputBusqueda, setInputBusqueda }) => {
  const [value, setValue] = useState(inputBusqueda);

  useEffect(() => {
    const handler = setTimeout(() => {
      setInputBusqueda(value);
    }, 300);
    return () => clearTimeout(handler);
  }, [value, setInputBusqueda]);

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Busca un Pokémon"
        className="p-3 w-full max-w-lg text-lg font-bold text-yellow-900 bg-yellow-200 border-2 border-yellow-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-700"
      />
    </div>
  );
};

export default BarraBusqueda;
