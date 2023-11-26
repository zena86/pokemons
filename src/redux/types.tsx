import { QueryStatus } from '@reduxjs/toolkit/query';
import { PokemonDescription } from '@/components/pokemonCard/types';

export interface PokemonsResponse {
  count: number;
  pokemons: PokemonDescription[];
}

export interface PokemonsRequestProps {
  pokemonsRequest: PokemonsResponse;
}

export interface ErrorResponse {
  data: string;
  error: string;
  originalStatus: number;
  status: string;
}
