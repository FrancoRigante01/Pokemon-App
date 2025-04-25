import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Pokemon } from "../../interface/pokemon";
import { EquipoContextType } from "../../interface/hooks/Equipo";
import { db } from "../../firebase";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

// Crear contexto para el equipo de Pokémon del usuario
export const EquipoContext = createContext<EquipoContextType | undefined>(undefined);

// Hook para acceder fácilmente al contexto del equipo
export const useEquipo = (): EquipoContextType => {
  const context = useContext(EquipoContext);
  if (!context) {
    throw new Error("useEquipo debe usarse dentro de un <HooksEquipo>");
  }
  return context;
};

// Componente proveedor del contexto de equipo
export const HooksEquipo = ({ children }: { children: React.ReactNode }) => {
  const [equipo, setEquipo] = useState<Pokemon[]>([]);        // Estado con los Pokémon del equipo
  const { user } = useAuth();                                 // Usuario autenticado desde contexto de auth
  const [loading, setLoading] = useState(true);               // Estado de carga de datos

  const initialLoadRef = useRef(true);                        // Ref para evitar que el primer setEquipo dispare guardado a Firestore

  // IDs únicos para el documento
  const emailId = user?.email?.replace(/\./g, "_") || null;
  const uidId = user?.uid || null;

  // Efecto para sincronizar el equipo desde Firestore (y migrar si es necesario)
  useEffect(() => {
    if (!user) {
      // Si el usuario se desloguea, limpiamos estado
      setLoading(false);
      setEquipo([]);
      initialLoadRef.current = true;
      return;
    }

    // Cada vez que cambia el usuario: resetear estados
    initialLoadRef.current = true;
    setLoading(true);
    setEquipo([]);

    const targetId = emailId!;
    const docRef = doc(db, "equipos", targetId);

    // Escuchar cambios en tiempo real en el documento del equipo
    const unsubscribe = onSnapshot(
      docRef,
      async (snap) => {
        if (snap.exists()) {
          // Si el documento ya existe, usa sus datos
          const data = snap.data();
          const loaded = (data.equipo as Pokemon[]) || [];
          console.log(`HooksEquipo: doc encontrado, equipo:`, loaded);
          setEquipo(loaded);
        } else if (uidId) {
          // Si no existe, intenta migrar desde el UID antiguo
          const oldRef = doc(db, "equipos", uidId);
          const oldSnap = await getDoc(oldRef);
          if (oldSnap.exists()) {
            const oldData = oldSnap.data();
            const migrated = (oldData.equipo as Pokemon[]) || [];
            console.log("HooksEquipo: migrando equipo desde UID:", migrated);
            await setDoc(docRef, { equipo: migrated, uid: uidId }, { merge: true });
            setEquipo(migrated);
          } else {
            // No hay datos en UID ni en email
            console.log("HooksEquipo: no existe equipo previo para UID ni emailId");
            setEquipo([]);
          }
        } else {
          // Nuevo usuario sin equipo guardado
          console.log(`HooksEquipo: no existe documento equipo en ${docRef.path}`);
          setEquipo([]);
        }
        setLoading(false);
        initialLoadRef.current = false; // Ya se hizo la carga inicial
      },
      (error) => {
        // Si hubo un error al escuchar
        console.error("Error al sincronizar equipo:", error);
        setLoading(false);
        initialLoadRef.current = false;
      }
    );

    // Limpiar el listener al desmontar o cambiar de usuario
    return () => unsubscribe();
  }, [emailId, uidId, user]);

  // Guardar en Firestore si cambió el equipo (pero evitar hacerlo en la primera carga)
  useEffect(() => {
    if (!user || !emailId || loading || initialLoadRef.current) return;

    const ref = doc(db, "equipos", emailId);
    console.log("HooksEquipo: guardando equipo en:", ref.path, equipo);

    setDoc(ref, { equipo, uid: user.uid }, { merge: true })
      .then(() => console.log("HooksEquipo: equipo guardado correctamente."))
      .catch((error) => console.error("Error al guardar equipo:", error));
  }, [equipo, emailId, user, loading]);

  // Funciones para modificar el equipo desde otros componentes
  const setEquipoCompleto = (nuevoEquipo: Pokemon[]) => setEquipo(nuevoEquipo);

  const setEquipoInicial = (equipoInicial: Pokemon[]) => setEquipo(equipoInicial);

  const agregarAPequipo = (pokemon: Pokemon) => {
    setEquipo((prev) => {
      // Evitar duplicados y que haya más de 6
      if (prev.length >= 6 || prev.some((p) => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const quitarDeEquipo = (id: number) => setEquipo((prev) => prev.filter((p) => p.id !== id));

  // Proveer el estado y funciones a los hijos
  return (
    <EquipoContext.Provider
      value={{ equipo, agregarAPequipo, quitarDeEquipo, setEquipoInicial, setEquipoCompleto, loading }}
    >
      {children}
    </EquipoContext.Provider>
  );
};
