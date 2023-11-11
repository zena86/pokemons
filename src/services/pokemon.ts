import { PokemonDescription } from '../components/pokemonCard/types';
import { FetchResponse, PokemonResult } from './types';

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2/';
const WORKER_BASE = 'https://pokemons-2.jk-mostovaya.workers.dev/';

const makeRequest = async <T>(url: string): Promise<FetchResponse<T>> => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return { result };
  } catch (error) {
    return { errorMessage: `Oops! ${error}. URL ${url}` };
  }
};

export const getPokemon = (
  url: string
): Promise<FetchResponse<PokemonDescription>> => {
  return makeRequest<PokemonDescription>(url);
};

export const getPokemonByName = (
  name: string
): Promise<FetchResponse<PokemonDescription>> => {
  return makeRequest<PokemonDescription>(`${POKEMON_API_BASE}pokemon/${name}`);
};

export const getPokemonsPerPage = (
  limit?: number,
  offset?: number,
  search?: string
): Promise<FetchResponse<PokemonResult>> => {
  return makeRequest<PokemonResult>(
    `${WORKER_BASE}?search=${search}&offset=${offset}&limit=${limit}`
  );
};
