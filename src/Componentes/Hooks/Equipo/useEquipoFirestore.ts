// useEquipoFirestore.ts
import { useState, useEffect, useRef } from "react";
import { Pokemon } from "../../../interface/pokemon";
import { db } from "../../../firebase";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

export const useEquipoFirestore = () => {
  const [equipo, setEquipo] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const initialLoadRef = useRef(true);

  const uid = user?.uid || null;
  const emailId = user?.email?.replace(/\./g, "_") || null;

  // Efecto de carga inicial y migración
  useEffect(() => {
    if (!uid) {
      setLoading(false);
      setEquipo([]);
      initialLoadRef.current = true;
      return;
    }

    initialLoadRef.current = true;
    setLoading(true);
    setEquipo([]);

    const docRef = doc(db, "equipos", uid);

    const unsubscribe = onSnapshot(
      docRef,
      async (snap) => {
        try {
          if (snap.exists()) {
            const data = snap.data();
            setEquipo((data.equipo as Pokemon[]) || []);
          } else if (emailId) {
            // Migración desde el documento antiguo indexado por email
            const legacyRef = doc(db, "equipos", emailId);
            const legacySnap = await getDoc(legacyRef);
            if (legacySnap.exists() && legacySnap.data().uid === uid) {
              const migrated = (legacySnap.data().equipo as Pokemon[]) || [];
              await setDoc(docRef, { equipo: migrated, uid }, { merge: true });
              setEquipo(migrated);
            } else {
              setEquipo([]);
            }
          } else {
            setEquipo([]);
          }
        } catch (error) {
          console.error("Error al migrar equipo:", error);
        } finally {
          setLoading(false);
          initialLoadRef.current = false;
        }
      },
      (error) => {
        console.error("Error al sincronizar equipo:", error);
        setLoading(false);
        initialLoadRef.current = false;
      }
    );

    return () => unsubscribe();
  }, [uid, emailId]);

  // Efecto para guardar equipo en Firestore
  useEffect(() => {
    if (!uid || loading || initialLoadRef.current) return;

    const ref = doc(db, "equipos", uid);
    setDoc(ref, { equipo, uid }, { merge: true }).catch((error) =>
      console.error("Error al guardar equipo:", error)
    );
  }, [equipo, uid, loading]);

  return { equipo, setEquipo, loading };
};
