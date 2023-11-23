import { PokemonDescription } from '../pokemonCard/types';
// import { Pokemon } from '../searchList/types';
import { Option } from '../select/types';

export interface Payload {
  selectedOption: Option;
  prevOption?: Option;
}

export interface SettingsPanelProps {
  onItemsChange: (payload: Payload) => void;
}

export interface PokemonsRequestProps {
  pokemonsRequest: {
    count: number;
    pokemons: PokemonDescription[];
  };
}
