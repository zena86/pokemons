import { Pokemon } from '../searchList/types';

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface VersionGroupDetails {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetails[];
}

export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: unknown;
  versions: unknown;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDescription {
  abilities: Ability[];
  base_experience: unknown;
  forms: Form[];
  game_indices: unknown[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: unknown[];
  species: {
    name: string;
    url: string;
  };
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
}
