import { IPokemonDescription } from '../components/pokemonCard/types';
import { IPokemon } from '../components/searchResults/types';

export interface IPokemonsResponse {
  pokemons?: IPokemon[];
  errorMessage?: string;
}

export interface IPokemonResponse {
  pokemon?: IPokemonDescription;
  errorMessage?: string;
}
