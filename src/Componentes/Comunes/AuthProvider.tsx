import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
} from "firebase/auth";
import { auth } from "../../firebase"; 

interface AuthContextType {
  user: User | null;
  loading: boolean; 
  login: (email: string, password: string) => Promise<void>; 
  register: (email: string, password: string) => Promise<void>; 
  logout: () => Promise<void>; 
}

// Crear el contexto de autenticación con un valor inicial vacío (se define más adelante).
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Hook para acceder al contexto de autenticación en otros componentes.
export const useAuth = () => useContext(AuthContext);

// El proveedor de contexto que envuelve a los componentes de la app y les da acceso al contexto de autenticación.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Estado que guarda el usuario actual.
  const [loading, setLoading] = useState(true); 

  // Se suscribe a los cambios en el estado de autenticación de Firebase.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false); 
    });

    // Función de limpieza que cancela la suscripción cuando el componente se desmonta.
    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión con un email y contraseña.
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password); 
  };

  // Función para registrar un nuevo usuario con un email y contraseña.
  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password); 
  };

  // Función para cerrar la sesión del usuario actual.
  const logout = async () => {
    await signOut(auth); 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
