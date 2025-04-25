import { Stat } from "../../interface/stats";

// Componente que muestra las estadísticas base de un Pokémon
const PokemonStats = ({ stats }: { stats?: Stat[] }) => {
  if (!Array.isArray(stats)) {
    return <p className="mt-4 text-red-400">Estadísticas no disponibles.</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">Estadísticas Base</h2>
      <ul>
        {stats.map((stat) => (
          <li key={stat.name}>
            <strong>
              {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}:
            </strong>{" "}
            {stat.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonStats;
