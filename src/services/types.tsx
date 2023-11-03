import { PokemonDescription } from '../components/pokemonCard/types';
import { Pokemon } from '../components/searchList/types';

export interface PokemonResult {
  count: number;
  pokemons: Pokemon[];
}

export interface PokemonsResponse {
  result?: PokemonResult;
  errorMessage?: string;
}

export interface PokemonResponse {
  pokemon?: PokemonDescription;
  errorMessage?: string;
}
