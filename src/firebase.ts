import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvMFtvXV6eyWYHL1s1PmJmUitYUw3wUk4",
  authDomain: "pokemon-app-70087.firebaseapp.com",
  projectId: "pokemon-app-70087",
  storageBucket: "pokemon-app-70087.firebasestorage.app",
  messagingSenderId: "574233104250",
  appId: "1:574233104250:web:0bf3b44b0bf3f3fa40d0c3",
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar la base de datos de Firestore
const db = getFirestore(app);

// Configurar persistencia de sesión en sessionStorage
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // La sesión se mantendrá sólo en la pestaña del navegador
    console.log("Persistencia de sesión configurada: sessionStorage");
  })
  .catch((error) => {
    console.error("Error al establecer la persistencia de sesión:", error);
  });

export { db, auth };
