import { Pokemon } from '../../components/searchList/types';

export interface HomeState {
  filteredPokemons: Pokemon[];
  term: string;
  isLoading: boolean;
  errorMessage: string | null;
}

export interface HomeProps {}
