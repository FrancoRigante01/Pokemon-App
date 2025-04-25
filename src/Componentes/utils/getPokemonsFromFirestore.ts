import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 
import { Pokemon } from "../../interface/pokemon"; 

export const getPokemonsFromFirestore = async (): Promise<Pokemon[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "pokemons"));
    const pokemons: Pokemon[] = [];

    querySnapshot.forEach((doc) => {
      pokemons.push(doc.data() as Pokemon);
    });

    return pokemons;
  } catch (error) {
    console.error("Error al obtener los Pokémon desde Firestore:", error);
    return [];
  }
};
