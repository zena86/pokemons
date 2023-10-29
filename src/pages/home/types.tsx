import { Pokemon } from '../../components/searchResults/types';

export interface HomeState {
  filteredPokemons: Pokemon[];
  term: string;
  isLoading: boolean;
  errorMessage: string;
}

export interface HomeProps {}
