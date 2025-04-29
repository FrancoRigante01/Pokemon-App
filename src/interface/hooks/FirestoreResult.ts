import { Pokemon } from "../../interface/pokemon";

export interface FirestoreResult {
  pokemons: Pokemon[];
  loading: boolean;
  moreLoading: boolean;
  hasMore: boolean;
  fetchInitial: () => void;
  fetchMore: () => void;
}