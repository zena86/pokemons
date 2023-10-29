import { PokemonDescription } from '../components/pokemonCard/types';
import { Pokemon } from '../components/searchList/types';

export interface PokemonsResponse {
  pokemons?: Pokemon[];
  errorMessage?: string;
}

export interface PokemonResponse {
  pokemon?: PokemonDescription;
  errorMessage?: string;
}
