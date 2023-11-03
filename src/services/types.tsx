import { PokemonDescription } from '../components/pokemonCard/types';
import { Pokemon } from '../components/searchList/types';

export interface PokemonResult {
  count: number;
  pokemons: Pokemon[];
}

export interface PokResponse {
  result?: PokemonDescription | PokemonResult;
  errorMessage?: string;
}
