import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Registrar en Firebase Auth
      const userCredential = await register(email, password);
      const user = userCredential.user;

      // Sanitizar email para usar como ID de documento
      const sanitizedEmail = email.replace(/\./g, "_");

      // Guardar datos en Firestore en colección 'users' con el email como ID
      await setDoc(doc(db, "users", sanitizedEmail), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      setError(null);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("ERROR Register:", err);
      setError("No se pudo registrar el usuario. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a40] via-[#2d1a5a] to-[#3c0f63] relative overflow-hidden">
      {/* Efectos de blur decorativos */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30 -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-[130px] opacity-30 -bottom-40 -right-40 animate-pulse"></div>

      {/* Contenedor del formulario */}
      <div className="relative z-10 w-full max-w-xs mx-auto p-6 rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Crear cuenta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-gray-900/70 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

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

          {error && <p className="text-red-400 text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg mt-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
