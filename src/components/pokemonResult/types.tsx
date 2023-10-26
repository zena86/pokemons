import { IPokemonDescription } from '../pokemonCard/types';

export interface IPokemonCardProps {
  key: string;
  url: string;
}

export interface IPokemonState {
  pokemon?: IPokemonDescription | null;
  errorMessage?: string;
  isLoading: boolean;
}
