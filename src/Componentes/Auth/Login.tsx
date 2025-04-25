import { useState } from "react"; 
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores (en caso de fallos en login)

  const { login } = useAuth();
  
  // Hook de navegación para redirigir al usuario a otras páginas
  const navigate = useNavigate();

  // Función que maneja el envío del formulario de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recarga de página)
    try {
      // Intentamos hacer login 
      await login(email, password);
      setError(null); // Si el login es exitoso, limpiar el estado de error
      navigate("/", { replace: true }); // Redirigir al usuario a la página principal
    } catch (err) {
      // Mensaje de error
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a40] via-[#2d1a5a] to-[#3c0f63] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30 -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-[130px] opacity-30 -bottom-40 -right-40 animate-pulse"></div>

      {/* Contenedor principal del formulario */}
      <div className="relative z-10 w-full max-w-xs mx-auto p-6 rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Iniciar sesión</h2>
        {/* Formulario para capturar el email y la contraseña */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Campo para el correo electrónico */}
          <div>
            <label htmlFor="email" className="block mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-gray-900/70 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de email
              required
            />
          </div>

          {/* Campo para la contraseña */}
          <div>
            <label htmlFor="password" className="block mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-gray-900/70 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          {/* Si existe un error de autenticación, se muestra un mensaje */}
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}

          {/* Botón para enviar el formulario de login */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg mt-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
