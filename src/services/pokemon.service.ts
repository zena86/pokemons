import { PokemonResponse, PokemonsResponse } from './types';

export const getPokemon = async (url: string): Promise<PokemonResponse> => {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();
    return { pokemon: pokemon };
  } catch (error) {
    return { errorMessage: `Oops! ${error}. URL ${url}` };
  }
};

export const getPokemonsPerPage = async (
  limit?: number,
  offset?: number,
  search?: string
): Promise<PokemonsResponse> => {
  try {
    const response = await fetch(
      `https://pokemons-2.jk-mostovaya.workers.dev/?search=${search}&offset=${offset}&limit=${limit}`
    );
    const result = await response.json();
    return { result: result };
  } catch (error) {
    return { errorMessage: `Oops! ${error}` };
  }
};
