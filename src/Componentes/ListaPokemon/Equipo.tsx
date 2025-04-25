import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useEquipo } from "../Hooks/Equipo/EquipoContext";

export default function MiEquipo() {
  const { user } = useAuth();
  const { equipo, quitarDeEquipo, setEquipoCompleto } = useEquipo();
  const [pokemons] = useState<any[]>([]);
  const [idsCargados, setIdsCargados] = useState<number[]>([]);
  const [equipoCargado, setEquipoCargado] = useState(false);

  // Resetear estado cuando cambia el usuario
  useEffect(() => {
    setEquipoCargado(false);
    setIdsCargados([]);
  }, [user]);

  // Escuchar cambios del equipo en Firestore (onSnapshot)
  useEffect(() => {
    if (!user || pokemons.length === 0 || equipoCargado) return;

    const ref = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const ids: number[] = data.team || [];

        // Filtrar solo los que están en el JSON local
        const pokemonsEquipo = pokemons.filter(
          (p) => ids.includes(p.id)
        );

        // Evitar sobrescribir si ya están en el equipo
        const equipoActualIds = equipo.map(p => p.id).sort().join(",");
        const nuevosIds = pokemonsEquipo.map(p => p.id).sort().join(",");

        if (equipoActualIds !== nuevosIds) {
          console.log("Cargando equipo desde Firestore:", pokemonsEquipo);
          setEquipoCompleto(pokemonsEquipo);
          setIdsCargados(ids);
        }

        setEquipoCargado(true);
      }
    });

    return () => unsubscribe(); // Limpiar suscripción
  }, [user, pokemons]);

  // Guardar en Firestore cuando el equipo cambie
  useEffect(() => {
    if (!user || !equipoCargado) return;

    const guardarEquipo = async () => {
      const ids = equipo.map(p => p.id);
      if (JSON.stringify(ids) !== JSON.stringify(idsCargados)) {
        const ref = doc(db, "users", user.uid);
        await setDoc(ref, { team: ids }, { merge: true });
        setIdsCargados(ids);
      }
    };

    guardarEquipo();
  }, [equipo, user, equipoCargado]);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-bold mb-2">Mi Equipo</h2>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => {
          const pokemon = equipo[i];
          return (
            <div
              key={i}
              className="bg-gray-700 rounded-xl p-2 flex items-center justify-center h-16"
            >
              {pokemon ? (
                <div className="cursor-pointer hover:text-red-400" onClick={() => quitarDeEquipo(pokemon.id)}>
                  <img
                    src={pokemon.sprites.front_default || "/path/to/default-image.png"}
                    alt={`Pokémon ${pokemon.id}`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              ) : (
                <span className="text-gray-500">Vacío</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
