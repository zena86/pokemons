import { Pokemon } from '../components/searchList/types';

export interface Payload {
  term?: string;
  pokemonsPerPage?: Pokemon[];
}

export interface SearchState {
  term: string;
  pokemonsPerPage: Pokemon[];
}

export interface Action {
  type: string;
  payload?: Payload;
}
