import { useNavigate } from "react-router-dom";

const Bienvenida = () => {
  // Hook de navegación para redirigir a otras rutas
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-900 p-8 text-center">
      {/* Imagen de bienvenida (Pokémon Pikachu) */}
      <img
        src="/pikachu.png"
        alt="Gif de bienvenida"
        className="w-32 md:w-40 mb-6"
      />

      {/* Título de bienvenida */}
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-md">
        ¡Bienvenido a la Pokémon App!
      </h1>

      {/* Descripción de la aplicación */}
      <p className="text-lg md:text-xl max-w-2xl mb-6 font-medium">
        Esta aplicación te permite explorar el mundo de los pokémons y conocer mas informacion acerca de ellos!
        Descubre sus tipos, ataques y estadísticas, todo a través de una interfaz atractiva y fácil de usar.
      </p>

      {/* Segundo párrafo */}
      <p className="text-lg md:text-xl max-w-2xl mb-6 font-medium">
        Al registrarte o iniciar sesión, podrás acceder a todas las funcionalidades de la app. Podrás buscar pokémons,
        filtrarlos por generación o tipo, explorar sus detalles y ¡Crear tu propio equipo!
        No pierdas la oportunidad de disfrutar de una experiencia única y completa.
      </p>

      {/*Opciones de inicio de sesión o registro */}
      <p className="text-md mb-6">Para comenzar, elegí una opción:</p>
      
      <div className="flex gap-4">
        {/* Botón para Iniciar sesión */}
        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Iniciar sesión
        </button>

        {/* Botón para registrarse */}
        <button
          onClick={() => navigate("/register")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Bienvenida;
