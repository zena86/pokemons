import { SearchState } from './types';

export const initialValue: SearchState = {
  term: localStorage.getItem('term') ?? '',
  pokemonsPerPage: [],
};

export const CHANGE_TERM = 'CHANGE_TERM';
export const CHANGE_POKEMONS_PER_PAGE = 'CHANGE_POKEMONS_PER_PAGE';
