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

  const emailId = user?.email?.replace(/\./g, "_") || null;
  const uidId = user?.uid || null;

  // Efecto de carga inicial y migración
  useEffect(() => {
    if (!user) {
      setLoading(false);
      setEquipo([]);
      initialLoadRef.current = true;
      return;
    }

    initialLoadRef.current = true;
    setLoading(true);
    setEquipo([]);

    const targetId = emailId!;
    const docRef = doc(db, "equipos", targetId);

    const unsubscribe = onSnapshot(
      docRef,
      async (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setEquipo((data.equipo as Pokemon[]) || []);
        } else if (uidId) {
          const oldRef = doc(db, "equipos", uidId);
          const oldSnap = await getDoc(oldRef);
          if (oldSnap.exists()) {
            const migrated = (oldSnap.data().equipo as Pokemon[]) || [];
            await setDoc(docRef, { equipo: migrated, uid: uidId }, { merge: true });
            setEquipo(migrated);
          } else {
            setEquipo([]);
          }
        } else {
          setEquipo([]);
        }
        setLoading(false);
        initialLoadRef.current = false;
      },
      (error) => {
        console.error("Error al sincronizar equipo:", error);
        setLoading(false);
        initialLoadRef.current = false;
      }
    );

    return () => unsubscribe();
  }, [emailId, uidId, user]);

  // Efecto para guardar equipo en Firestore
  useEffect(() => {
    if (!user || !emailId || loading || initialLoadRef.current) return;

    const ref = doc(db, "equipos", emailId);
    setDoc(ref, { equipo, uid: user.uid }, { merge: true }).catch((error) =>
      console.error("Error al guardar equipo:", error)
    );
  }, [equipo, emailId, user, loading]);

  return { equipo, setEquipo, loading };
};
