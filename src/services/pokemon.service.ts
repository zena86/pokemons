import { PokResponse } from './types';

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2/';
const WORKER_BASE = 'https://pokemons-2.jk-mostovaya.workers.dev/';

const makeRequest = async (url: string): Promise<PokResponse> => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return { result: result };
  } catch (error) {
    return { errorMessage: `Oops! ${error}. URL ${url}` };
  }
};

export const getPokemon = async (url: string): Promise<PokResponse> => {
  return makeRequest(url);
};

export const getPokemonByName = async (name: string): Promise<PokResponse> => {
  return makeRequest(`${POKEMON_API_BASE}pokemon/${name}`);
};

export const getPokemonsPerPage = async (
  limit?: number,
  offset?: number,
  search?: string
): Promise<PokResponse> => {
  return makeRequest(
    `${WORKER_BASE}?search=${search}&offset=${offset}&limit=${limit}`
  );
};
