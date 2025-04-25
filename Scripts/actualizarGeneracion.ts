import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from '../src/firebase'; 

const generaciones = [
  { id: 1, nombre: "Generación I", rango: [1, 151] },
  { id: 2, nombre: "Generación II", rango: [152, 251] },
  { id: 3, nombre: "Generación III", rango: [252, 386] },
  { id: 4, nombre: "Generación IV", rango: [387, 493] },
  { id: 5, nombre: "Generación V", rango: [494, 649] },
  { id: 6, nombre: "Generación VI", rango: [650, 721] },
  { id: 7, nombre: "Generación VII", rango: [722, 809] },
  { id: 8, nombre: "Generación VIII", rango: [810, 898] },
];

const updateGeneracion = async () => {
  // Obtener todos los documentos de Pokémon
  const pokemonsCollection = collection(db, "pokemons");  // Ajustar el nombre de la colección si es necesario
  const snapshot = await getDocs(pokemonsCollection);

  snapshot.forEach(async (docSnapshot) => {
    const pokemonData = docSnapshot.data();
    const pokemonId = pokemonData.id;  // Se fija de que tu Pokémon tenga un campo 'id' que identifique al Pokémon

    // Encuentra la generación correspondiente al Pokémon según su id
    const generacion = generaciones.find((gen) => {
      return pokemonId >= gen.rango[0] && pokemonId <= gen.rango[1];
    });

    if (generacion) {
      // Actualiza el documento del Pokémon con el campo 'generacion'
      await updateDoc(doc(db, "pokemons", docSnapshot.id), {
        generacion: generacion.id,
      });

      console.log(`Generación ${generacion.nombre} añadida al Pokémon ${pokemonId}`);
    }
  });
};

updateGeneracion().catch(console.error);
