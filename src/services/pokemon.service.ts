import { IPokemonResponse, IPokemonsResponse } from './types';

export const getPokemons = async (
  limit: string,
  offset: string
): Promise<IPokemonsResponse> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonList = await response.json();
    return { pokemons: pokemonList.results };
  } catch (error) {
    return { errorMessage: `Oops! ${error}` };
  }
};

export const getPokemon = async (url: string): Promise<IPokemonResponse> => {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();
    return { pokemon: pokemon };
  } catch (error) {
    return { errorMessage: `Oops! ${error}. URL ${url}` };
  }
};
