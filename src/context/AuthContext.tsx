import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

// Definimos el tipo de contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Creamos el contexto con un valor por defecto vacío (se sobrescribirá)
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Función de login retorna UserCredential
  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Función de registro retorna UserCredential
  const register = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Función de logout
  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  // Renderizar loader mientras se determina el estado de autenticación
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando sesión…</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
  