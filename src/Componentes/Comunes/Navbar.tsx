import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth(); 

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white shadow-lg">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold tracking-wider">Pokémon App</h1>

        {/* Mostrar solo el botón "Volver a la Página Principal" si estamos en la página de detalle */}
        {location.pathname.includes("/pokemon/") && (
          <Link 
            to="/" 
            className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-blue-800 transition duration-300 ease-in-out"
          >
            Volver a la Página Principal
          </Link>
        )}

        {/* Botones de login y registro o logout según el estado de autenticación */}
        <div className="space-x-4">
          {user ? (
            <>
              <span>Hola, {user.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
