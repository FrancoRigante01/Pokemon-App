// scripts/actualizarCries.mjs
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { readFile } from "fs/promises";
import path from "path";
import url from "url";

// ————————————————
// 1) CARGAR EL JSON DE POKÉMONS
// ————————————————
async function loadPokemons() {
  // __dirname en ESM
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const jsonPath = path.join(__dirname, "pokemons.json");
  const raw = await readFile(jsonPath, "utf8");
  return JSON.parse(raw);
}

// ————————————————
// 2) CONFIGURACIÓN DE FIREBASE
// ————————————————
const firebaseConfig = {
  apiKey: "AIzaSyCvMFtvXV6eyWYHL1s1PmJmUitYUw3wUk4",
  authDomain: "pokemon-app-70087.firebaseapp.com",
  projectId: "pokemon-app-70087",
  storageBucket: "pokemon-app-70087.firebasestorage.app",
  messagingSenderId: "574233104250",
  appId: "1:574233104250:web:0bf3b44b0bf3f3fa40d0c3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ————————————————
// 3) FUNCIÓN PARA ACTUALIZAR UN CRY
// ————————————————
async function actualizarCry(nombre, id) {
  const key = nombre
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // normalizar

  const cryURL = `https://play.pokemonshowdown.com/audio/cries/${key}.mp3`;

  try {
    const ref = doc(db, "pokemons", id);
    await updateDoc(ref, { cry: cryURL });
    console.log(`✅ ${nombre} (ID ${id}) actualizado`);
  } catch (err) {
    console.error(`❌ Error en ${nombre} (ID ${id}):`, err.message);
  }
}

// ————————————————
// 4) MAIN: recorre y actualiza todos
// ————————————————
async function main() {
  const pokemons = await loadPokemons();
  for (const p of pokemons) {
    await actualizarCry(p.name, String(p.id));
  }
  console.log("🔥 Todos los cries actualizados.");
}

main().catch(err => {
  console.error("FATAL:", err);
  process.exit(1);
});
