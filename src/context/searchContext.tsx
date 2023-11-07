import { createContext } from 'react';
import { Action, Search } from './types';
import { Dispatch } from 'react';
import { initialValue } from './constants';

export const SearchContext = createContext<Search>(initialValue);
export const SearchDispatchContext = createContext<Dispatch<Action>>(
  () => null
);
