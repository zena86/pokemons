import { createContext } from 'react';
import { Action, SearchState } from './types';
import { Dispatch } from 'react';
import { initialValue } from './constants';

export const SearchContext = createContext<SearchState>(initialValue);
export const SearchDispatchContext = createContext<Dispatch<Action>>(
  () => null
);
