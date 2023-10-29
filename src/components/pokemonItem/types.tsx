import { PokemonDescription } from '../pokemonCard/types';

export interface PokemonCardProps {
  key: string;
  url: string;
}

export interface PokemonState {
  pokemon?: PokemonDescription | null;
  errorMessage?: string | null;
  isLoading: boolean;
}
