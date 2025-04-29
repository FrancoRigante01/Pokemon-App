import { JSX, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./Estilos/index.css";
import { ListaPokemon, PokemonDetalle, Login, Register, Bienvenida } from "./Componentes";
import MusicaFondo from "./Componentes/Comunes/MusicaFondo";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { EquipoProvider } from "./Componentes/Hooks/Equipo/HooksEquipo";

const App = () => (
  <Routes>
    {/* Rutas protegidas */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <ListaPokemon />
        </ProtectedRoute>
      }
    />
    <Route
      path="/pokemon/:id"
      element={
        <ProtectedRoute>
          <PokemonDetalle />
        </ProtectedRoute>
      }
    />

    {/* Rutas públicas */}
    <Route path="/bienvenida" element={<Bienvenida />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Redirección por defecto */}
    <Route path="*" element={<Navigate to="/bienvenida" replace />} />
  </Routes>
);

// Componente de ruta protegida con manejo de loading
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando sesión…
      </div>
    );
  }

  return user ? children : <Navigate to="/bienvenida" replace />;
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <EquipoProvider>
          <MusicaFondo />
          <App />
        </EquipoProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
