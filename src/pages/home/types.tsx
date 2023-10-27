import { IPokemon } from '../../components/searchResults/types';

export interface IHomeState {
  filteredPokemons: IPokemon[];
  term: string;
  isLoading: boolean;
  errorMessage: string;
}

export interface IHomeProps {}
