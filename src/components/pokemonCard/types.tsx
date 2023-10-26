import { IPokemonDescription } from '../pokemonDescription/types';

export interface IPokemonCardProps {
  key: string;
  url: string;
}

export interface IPokemonState {
  pokemon?: IPokemonDescription | null;
  errorMessage?: string;
  isLoading: boolean;
}
