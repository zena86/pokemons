import { PokemonDescription } from '../pokemonCard/types';

export interface Pokemon {
  name: string;
  id: string;
}

export interface SearchListProps {
  pokemons: PokemonDescription[];
}
