import { SearchState } from './types';

export const initialValue: SearchState = {
  term: localStorage.getItem('term') ?? '',
  pokemonsPerPage: [],
};
