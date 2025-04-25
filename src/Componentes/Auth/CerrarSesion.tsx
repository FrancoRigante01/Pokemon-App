import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CerrarSesion = () => {
  const { logout } = useAuth(); // Obtiene la función logout del contexto de autenticación
  const navigate = useNavigate(); // Hook para manejar la navegación de rutas
  const [loading, setLoading] = useState(false); // Estado para manejar el proceso de logout
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función que maneja el cierre de sesión
  const handleLogout = async () => {
    setLoading(true);
    setError(null); // Reinicia cualquier error previo
    try {
      await logout(); // Llama a la función de logout para cerrar sesión
      navigate("/login"); // Redirige al usuario a la página de login tras cerrar sesión
    } catch (error) {
      setError("Error al cerrar sesión. Intenta nuevamente."); // Muestra un mensaje de error
      console.error("Error al cerrar sesión:", error); // Maneja cualquier error durante el logout
    } finally {
      setLoading(false); // Restaura el estado de loading una vez termine el proceso
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>} {/* Muestra el mensaje de error si existe */}
      <button
        onClick={handleLogout}
        disabled={loading} // Deshabilita el botón mientras se cierra sesión
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4"
      >
        {loading ? "Cerrando sesión..." : "Cerrar sesión"} {/* Cambia el texto del botón mientras se cierra sesión */}
      </button>
    </div>
  );
};

export default CerrarSesion;
