import { IPokemon } from '../../components/searchResults/types';

export interface IHomeState {
  allPokemons: IPokemon[];
  filteredPokemons: IPokemon[];
  term: string;
  isLoading: boolean;
  errorMessage: '';
}
