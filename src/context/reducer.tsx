import { CHANGE_POKEMONS_PER_PAGE, CHANGE_TERM } from '../constants';
import { Action, SearchState } from './types';

export const searchReducer = (
  state: SearchState,
  action: Action
): SearchState => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TERM:
      return {
        ...state,
        term: payload?.term || '',
      };
    case CHANGE_POKEMONS_PER_PAGE:
      return {
        ...state,
        pokemonsPerPage: payload?.pokemonsPerPage || [],
      };
    default:
      return state;
  }
};
