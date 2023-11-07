import { CHANGE_TERM } from './constants';
import { Action, State } from './types';

export const searchReducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TERM:
      return { ...state, term: payload };
    default:
      return state;
  }
};
